"use client";

import {
    ApolloLink,
    HttpLink,
    split,
} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GRAPHQL_QUERY_API_URL, GRAPHQL_API_URL, GRAPHQL_ENTITY_API_URL, GRAPHQL_QUERY_SUBSCRIPTION_URL, GRAPHQL_ENTITY_SUBSCRIPTION_URL } from "@/config/CONST";
import { onError } from "@apollo/client/link/error";
import { addNotification } from "../notifications/store";
import { RestLink } from "apollo-link-rest";
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";

export const ENTITY_CONTEXT = { clientName: "entity" }

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const queryLink = () => {
    // -- http
    const httpQueryLink = new HttpLink({ uri: GRAPHQL_QUERY_API_URL });
 
    // -- ws
    const wsQueryLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
        url: GRAPHQL_QUERY_SUBSCRIPTION_URL!,
        retryAttempts: 100,
        connectionParams: {
            timeout: 30000,
            retrying: true
        },
        shouldRetry: (_) => true,
        retryWait: (retries) => new Promise((resolve) => setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000)))
    })) : null;


    const queryLink = typeof window !== "undefined" && wsQueryLink != null
        ? split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsQueryLink,
            httpQueryLink,
        ) : httpQueryLink;

    return queryLink;
}

const entityLink = () => {
    // -- http
    const httpEntityLink = new HttpLink({ uri: GRAPHQL_ENTITY_API_URL });

    // -- ws
    const wsEntityLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
        url: GRAPHQL_ENTITY_SUBSCRIPTION_URL!,
        retryAttempts: 100,
        connectionParams: {
            timeout: 30000,
            retrying: true
        },
        shouldRetry: (_) => true,
        retryWait: (retries) => new Promise((resolve) => setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000)))
    })) : null;


    const entityLink = typeof window !== "undefined" && wsEntityLink != null
        ? split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsEntityLink,
            authLink.concat(httpEntityLink),
        ) : httpEntityLink;

    return entityLink;
}

function makeClient() {

    // - rest
    const restLink = new RestLink({ uri: GRAPHQL_API_URL });


    const link = typeof window !== "undefined" ? ApolloLink.split(
        (operation) => {
            return operation.getContext().clientName === "entity"
        },
        entityLink(),
        queryLink()
    ) : entityLink();


    // Create error link
    const errorLink = onError((message: any) => {
        if (message.networkError) {
            addNotification({
                message: `Network error: ${message.networkError.message} (${GRAPHQL_QUERY_API_URL})`,
                type: 'error'
            });
        }
    });

    return new NextSSRApolloClient({

        cache: new NextSSRInMemoryCache({
            typePolicies: {
                Query: {
                    fields: {

                    },
                },
            },
        }),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    errorLink,
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    authLink.concat(restLink),
                    link!
                ])
                : ApolloLink.from([errorLink, authLink.concat(restLink), link!])
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
