"use client";

import {
    ApolloLink,
    HttpLink,
} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GRAPHQL_API_URL } from "@/config/CONST";
import { onError } from "@apollo/client/link/error";
import { addNotification } from "../notifications/store";


function makeClient() {
    const httpLink = new HttpLink({
        uri: GRAPHQL_API_URL,
    });

    // Create error link
    const errorLink = onError((message: any) => {
        if (message.networkError) {
            addNotification({
                message: `Network error: ${message.networkError.message} (${GRAPHQL_API_URL})`,
                type: 'error'
            },);
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
                    httpLink,
                ])
                : ApolloLink.from([errorLink, httpLink])
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
