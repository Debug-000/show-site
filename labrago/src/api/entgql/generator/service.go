package generator

import (
	"context"

	"github.com/GoLabra/labrago/src/api/entgql/entity"
)

type SchemaManagerI interface { // TODO @David rename or move out
	WriteEntityToSchema(entityTemplateData EntityTemplateData) error
	BackupSchema() error
	Generate(ctx context.Context, entities []entity.Entity) error
	RevertSchema() error
}

type Service struct {
	SchemaManagerI SchemaManagerI
}

func NewEntity(SchemaManagerI SchemaManagerI) *Service {
	return &Service{
		SchemaManagerI: SchemaManagerI,
	}
}

// TODO @David revert using defer
func (s Service) UpdateEntity(ctx context.Context, where entity.EntityWhereUniqueInput, data entity.UpdateEntityInput) (*entity.Entity, error) {
	var entitiesToGenerate []entity.Entity
	entityToUpdate, err := ApplyEntityUpdate(where, data)

	if err != nil {
		return nil, err
	}

	err = s.SchemaManagerI.BackupSchema()

	if err != nil {
		return nil, err
	}

	err = s.SchemaManagerI.WriteEntityToSchema(*entityToUpdate)

	if err != nil {
		s.SchemaManagerI.RevertSchema()
		return nil, err
	}

	entitiesToGenerate = append(entitiesToGenerate, entityToUpdate.Entity)

	for _, relatedEntity := range entityToUpdate.RelatedEntities {
		entitiesToGenerate = append(entitiesToGenerate, relatedEntity.Entity)

		err = s.SchemaManagerI.WriteEntityToSchema(*relatedEntity)
		if err != nil {
			s.SchemaManagerI.RevertSchema()
			return nil, err
		}
	}

	err = s.SchemaManagerI.Generate(ctx, entitiesToGenerate)
	if err != nil {
		return nil, err
	}

	return &entityToUpdate.Entity, nil
}

func (s Service) CreateEntity(ctx context.Context, data entity.CreateEntityInput) (*entity.Entity, error) {
	entityToUpdate, err := ApplyEntityCreate(data)
	entitiesToGenerate := []entity.Entity{entityToUpdate.Entity}

	if err != nil {
		return nil, err
	}

	err = s.SchemaManagerI.BackupSchema()

	if err != nil {
		return nil, err
	}

	err = s.SchemaManagerI.WriteEntityToSchema(*entityToUpdate)

	if err != nil {
		s.SchemaManagerI.RevertSchema()
		return nil, err
	}

	for _, relatedEntity := range entityToUpdate.RelatedEntities {
		entitiesToGenerate = append(entitiesToGenerate, relatedEntity.Entity)

		err = s.SchemaManagerI.WriteEntityToSchema(*relatedEntity)
		if err != nil {
			s.SchemaManagerI.RevertSchema()
			return nil, err
		}
	}

	err = s.SchemaManagerI.Generate(ctx, entitiesToGenerate)
	if err != nil {
		return nil, err
	}

	return &entityToUpdate.Entity, nil
}

func (s Service) DeleteEntity(ctx context.Context, where entity.EntityWhereUniqueInput) (*entity.Entity, error) {
	// entityToDelete, ok := cache.GetByUniqueInput(where)
	// if !ok {
	// 	return nil, errors.New("entity.Entity does not exist")
	// }
	// err := os.Remove(fmt.Sprintf("entgql/schema/_user/%s.go", strcase.ToSnake(entityToDelete.EntName)))
	// if err != nil {
	// 	return nil, err
	// }
	// return &entityToDelete, nil

	panic("not implemented")
}
