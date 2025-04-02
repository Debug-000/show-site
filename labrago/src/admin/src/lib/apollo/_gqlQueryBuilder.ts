import * as gqlBuilder from 'gql-query-builder'
import { Field, Edge } from './graphql.entities';


function hackyOperationFromEntityName(word: string) {
    word = word.charAt(0).toLowerCase() + word.slice(1);
    word = `${word}s`;
    return word;
}


export const queryGetDataForEntity = (entityName: string, fields: Field[] | Edge[], edges: Edge[]) => {

    const children = [...fields.map(i => {
        return {
            ...i
        }
    }),
    ...edges.map(i => {
        return {
            ...i
        }
    })]

    const query = gqlBuilder.query({
        operation: hackyOperationFromEntityName(entityName),
        fields: [ ... fields.map(i => i.name),
                  ... edges.map(i => ({ [i.name]: ['name'] }))
                ]
    });

    return query;
}