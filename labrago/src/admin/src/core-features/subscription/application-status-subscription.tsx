import { useEffect, useRef } from "react";
import { useSubscription } from "./subscription-provider";
import { handleCodeGenerationStarted } from "@/store/handlers/handleCodeGenerationStarted";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { handleCodeGenerationCompleted } from "@/store/handlers/handleCodeGenerationCompleted";
import { AppStatusEvent } from "@/store/app-state";
import { AppStatusApplicationUpMessage, AppStatusEventCodeGenerationFailedMessage, AppStatusEventCodeGenerationRevertedMessage, AppStatusEventCodeGenerationStartedMessage, AppStatusEventMessage } from "@/types/centrifugo";
import { handleCodeGenerationReverted } from "@/store/handlers/handleCodeGenerationReverted";
import { handleCodeGenerationFailed } from "@/store/handlers/handleCodeGenerationFailed";
import { handleApplicationShutdown } from "@/store/handlers/handleApplicationShutdown";
import { handleApplicationUp } from "@/store/handlers/handleApplicationUp";

export const ApplicationStatusSubscription = () => {

    const client = useSubscription();

    const apolloClient = useApolloClient();
    const handlersRef = useRef<ApolloClient<any>>(apolloClient);
    handlersRef.current = apolloClient;
    
    useEffect(() => {
        return client.subscribe('APP_STATUS', (data: AppStatusEventMessage) => {
            
            if (data.event === AppStatusEvent.CODE_GENERATION_STARTED) {
                handleCodeGenerationStarted(data as AppStatusEventCodeGenerationStartedMessage, handlersRef.current);
                return;
            }

            if (data.event === AppStatusEvent.CODE_GENERATION_COMPLETED) {
                handleCodeGenerationCompleted();
                return;
            }

            if (data.event === AppStatusEvent.CODE_GENERATION_REVERTED) {
                handleCodeGenerationReverted(data as AppStatusEventCodeGenerationRevertedMessage);
                return;
            }

            if (data.event === AppStatusEvent.CODE_GENERATION_FAILED) {
                handleCodeGenerationFailed(data as AppStatusEventCodeGenerationFailedMessage);
                return;
            }

            if (data.event === AppStatusEvent.SHUTDOWN) {
                handleApplicationShutdown(data as AppStatusApplicationUpMessage);
                return;
            }

            if (data.event === AppStatusEvent.UP) {
                handleApplicationUp(data as AppStatusApplicationUpMessage, handlersRef.current);
                return;
            }
            
           

        });
    }, [client]);

    return null;
}
