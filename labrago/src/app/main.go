package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"app/config"
	"app/domain/repo"
	"app/domain/resolvers"
	"app/domain/svc"
	"app/ent"
	"app/ent/migrate"
	"app/generated"
	"app/handler"
	"app/login"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	gqlHandler "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/GoLabra/labrago/src/api/cache"
	"github.com/GoLabra/labrago/src/api/centrifuge"
	"github.com/GoLabra/labrago/src/api/constants"
	"github.com/GoLabra/labrago/src/api/entgql/annotations"
	"github.com/GoLabra/labrago/src/api/entgql/entity"
	"github.com/GoLabra/labrago/src/api/entgql/generator"
	"github.com/GoLabra/labrago/src/api/strcase"
	"github.com/GoLabra/labrago/src/api/utils"
	"github.com/centrifugal/gocent/v3"
	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/mitchellh/mapstructure"
	"github.com/rs/cors"
)

func main() {
	conf, err := config.New()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	log.Printf("Config:")

	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=require",
		conf.DBHost,
		conf.DBPort,
		conf.DBUser,
		conf.DBDBName,
		conf.DBPassword)
	db, err := sql.Open(dialect.Postgres, dsn)

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	err = db.Ping()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	db.SetMaxOpenConns(100)

	drv := entsql.OpenDB(dialect.Postgres, db)

	client := ent.NewClient(ent.Driver(drv))

	client = client.Debug()

	if err := client.Schema.Create(
		context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); err != nil {
		panic(err)
	}

	graph, err := entc.LoadGraph(conf.EntSchemaPath, &gen.Config{})
	if err != nil {
		panic(err)
	}

	cache.NewEntityCache(1 * time.Hour)
	cache.NewEdgeCache(1 * time.Hour)
	cache.NewFieldCache(1 * time.Hour)

	LoadSchema(graph)

	repository := repo.New(client)

	osFileSystem := utils.NewOSFileSystem()

	schemaManager := generator.NewSchemaManager(osFileSystem, "./schema", ".")

	service := svc.New(repository, schemaManager)

	gocentClient := gocent.New(gocent.Config{
		Addr: conf.CentrifugoApiAddress,
		Key:  conf.CentrifugoKey,
	})

	resolver := &resolvers.Resolver{
		Service: service,
	}

	router := chi.NewRouter()

	// Configure CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	})
	router.Use(corsMiddleware.Handler)

	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			var ctx = r.Context()
			ctx = context.WithValue(ctx, constants.ServiceContextValue, service)
			ctx = context.WithValue(ctx, constants.RepositoryContextValue, repository)
			ctx = context.WithValue(ctx, constants.CentrifugeClientContextValue, gocentClient)
			ctx = context.WithValue(ctx, "config", conf)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	})

	router.Group(func(router chi.Router) {
		srv := gqlHandler.New(generated.NewExecutableSchema(
			generated.Config{
				Resolvers: resolver,
			},
		))

		srv.AddTransport(transport.POST{})
		srv.AddTransport(transport.GET{})
		srv.Use(extension.Introspection{})

		router.Handle("/query", srv)
		router.Handle("/playground", handler.Playground("GraphQL playground", "/query"))
	})

	router.Group(func(router chi.Router) {
		router.Post("/login", login.Login)
	})

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", conf.ServerPort),
		Handler: router,
	}

	log.Printf("Server starting on port %s\n", conf.ServerPort)

	centrifuge.PublishAppStatusMessage(context.Background(), gocentClient, centrifuge.AppStatusUp, nil)

	err = server.ListenAndServe()

	if err != nil {
		panic(err)
	}
}

func LoadSchema(graph *gen.Graph) {
	for _, node := range graph.Nodes {
		var entityAnnotations annotations.Entity
		err := mapstructure.Decode(node.Annotations["Entity"], &entityAnnotations)
		if err != nil {
			panic(err)
		}

		entityName := strcase.NodeNameToGraphqlName(node.Name)
		cache.Entity.Set(entityName, entity.Entity{
			Name:             entityName,
			EntName:          node.Name,
			Caption:          entityAnnotations.Caption,
			Owner:            entityAnnotations.Owner,
			DisplayFieldName: entityAnnotations.DisplayField,
		})

		fields := []entity.Field{
			{
				Caption: "Id",
				Name:    "id",
				Type:    string(entity.FieldTypeID),
			},
		}
		for _, nodeField := range node.Fields {
			var fieldAnnotations annotations.Field
			err := mapstructure.Decode(nodeField.Annotations["Field"], &fieldAnnotations)
			if err != nil {
				panic(err)
			}

			required := !nodeField.Optional
			unique := nodeField.Unique

			field := entity.Field{
				Name:           strcase.ToLowerCamel(nodeField.Name),
				EntName:        nodeField.Name,
				Caption:        fieldAnnotations.Caption,
				Type:           string(fieldAnnotations.Type),
				Required:       &required,
				Unique:         &unique,
				Nillable:       nodeField.Nillable,
				UpdateDefault:  nodeField.UpdateDefault,
				AcceptedValues: fieldAnnotations.AcceptedValues,
			}

			if nodeField.Default {
				defaultValue := fmt.Sprint(nodeField.DefaultValue())
				if fieldAnnotations.DefaultValue != "" {
					defaultValue = fieldAnnotations.DefaultValue
				}
				field.DefaultValue = &defaultValue
			}

			if fieldAnnotations.Min != "" {
				field.Min = &fieldAnnotations.Min
			}

			if fieldAnnotations.Max != "" {
				field.Max = &fieldAnnotations.Max
			}

			if fieldAnnotations.Private {
				field.Private = &fieldAnnotations.Private
			}

			fields = append(fields, field)
		}
		cache.Field.Set(entityName, fields)

		edges := []entity.Edge{}
		for _, edge := range node.Edges {
			var edgeAnnotations annotations.Edge
			err := mapstructure.Decode(edge.Annotations["Edge"], &edgeAnnotations)
			if err != nil {
				panic(err)
			}

			required := !edge.Optional
			ref := ""
			if edge.Ref != nil && edge.IsInverse() {
				ref = edge.Ref.Name
			}

			edges = append(edges, entity.Edge{
				Name:         strcase.ToLowerCamel(edge.Name),
				EntName:      edge.Name,
				Caption:      edgeAnnotations.Caption,
				Required:     &required,
				Type:         edge.Type.Name,
				Ref:          ref,
				RelationType: edgeAnnotations.RelationType,
			})
		}
		cache.Edge.Set(entityName, edges)
	}
}
