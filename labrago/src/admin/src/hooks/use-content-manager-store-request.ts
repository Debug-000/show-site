import { ContentManagerSearchState } from "@/types/content-manager-search-state";
import { useCallback, useMemo } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Edge, Field } from "@/lib/apollo/graphql.entities";
import { GqlDataQueryBuilder } from "@/lib/apollo/builders/gqlQueryBuilder";
import { GqlDataCREATEMutationBuilder, GqlDataDELETEBulkMutationBuilder, GqlDataDELETEMutationBuilder, GqlDataUPDATEMutationBuilder } from "@/lib/apollo/builders/gqlMutationBuilder";
import { getAdvancedFiltersFromGridFilter } from "@/lib/utils/get-advanced-filters-from-grid-filters";
import { getAdvancedFiltersFromQuery } from "@/lib/utils/get-filters-from-query";


interface UseContentManagerStoreRequestParams {
    entityName: string
}
export const useContentManagerStoreRequest = (props: UseContentManagerStoreRequestParams) => {

    const { entityName } = props;
    const client = useApolloClient();

    const fetchData = useCallback(({ fields, edges, searchState }: {
        fields: Field[],
        edges: Edge[],
        searchState: ContentManagerSearchState
    }) => {

        const promise = new Promise((resolve, reject) => {

            if (!fields.length && !edges.length) {
                reject("No fields or edges to fetch");
                return;
            }

            var builder = new GqlDataQueryBuilder();
            var query = builder.addEntityName(entityName)
                .setPagination(searchState.page, searchState.rowsPerPage)
                .setOrder(searchState.sortBy, searchState.order)
                .addFields(fields.map(i => i.name))
                .addEdges(edges.map(i => i.name))
                .addAdvancedFilters(searchState.advancedFilters)
                .addAdvancedFilters(getAdvancedFiltersFromGridFilter(searchState.filter, fields))
                .addOrAdvancedFilters(getAdvancedFiltersFromQuery(searchState.query, fields))
                .build();

            if (!query) {
                reject("No query to fetch");
                return;
            }

            const operationName = builder.getOperationName();
            if (!operationName) {
                reject("No operationName to fetch");
                return;
            }

            client.query({ query: gql(query.query), variables: query.variables, fetchPolicy: "network-only" }).then((response) => {
                resolve({
                    data: response.data[operationName],
                    connection: response.data[builder.getOperationConnectionName()]
                });
            }).catch((error) => {
                reject(error);
            });
        });

        return promise;
    }, [client, entityName]);

    const addItem = useCallback((entityName: string, data: any) => {

        var builder = new GqlDataCREATEMutationBuilder().addField('id');
        var mutation = builder.addEntityName(entityName)
            .build(data);

        if (!mutation) {
            return Promise.reject("No mutation to add");
        }

        const operationName = builder.getOperationName();
        if (!operationName) {
            return Promise.reject("No operationName to add");
        }
        return client.mutate({ mutation: gql(mutation.query), variables: mutation.variables });
    }, [client]);

    const updateItem = useCallback((entityName: string, id: string, data: any) => {

        var builder = new GqlDataUPDATEMutationBuilder().addField('id');
        var mutation = builder.addEntityName(entityName)
            .build({ id, data });

        if (!mutation) {
            return;
        }

        const operationName = builder.getOperationName();
        if (!operationName) {
            return;
        }
        return client.mutate({ mutation: gql(mutation.query), variables: mutation.variables });
    }, [client]);

    const deleteItem = useCallback((entityName: string, id: string) => {
        var builder = new GqlDataDELETEMutationBuilder().addField('id');
        var mutation = builder.addEntityName(entityName)
            .build(id);

        if (!mutation) {
            return;
        }

        const operationName = builder.getOperationName();
        if (!operationName) {
            return;
        }
        return client.mutate({ mutation: gql(mutation.query), variables: mutation.variables });
    }, [client]);

    const deleteBulk = useCallback((entityName: string, ids: Array<string>) => {
        var builder = new GqlDataDELETEBulkMutationBuilder();
        var mutation = builder.addEntityName(entityName)
            .build(ids);

        if (!mutation) {
            return;
        }

        const operationName = builder.getOperationName();
        if (!operationName) {
            return;
        }
        return client.mutate({ mutation: gql(mutation.query), variables: mutation.variables });
    }, [client]);

    return useMemo(() => ({
        fetchData,
        addItem,
        updateItem,
        deleteItem,
        deleteBulk
    }), [fetchData, addItem, updateItem, deleteItem, deleteBulk]);
}