import { NameCaptionEntity } from "@/types/entity";
import { makeVar, useReactiveVar } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { AppStatusEvent, appStatusVar, entitiesInCodeGenerationVar } from ".";


export const useAppStatus = () => {
    const applicationStatus = useReactiveVar(appStatusVar);
    const entitiesInCodeGeneration = useReactiveVar(entitiesInCodeGenerationVar);

    const isEntityInCodeGeneration = useCallback((entityName: string) => {
        if (applicationStatus != AppStatusEvent.CODE_GENERATION_STARTED) {
            return false;
        }

        return entitiesInCodeGeneration.map(i => i.name).includes(entityName);
    }, [entitiesInCodeGeneration, applicationStatus]);

    const isCodeGenerating = useMemo(() => {
        return applicationStatus === AppStatusEvent.CODE_GENERATION_STARTED;
    }, [applicationStatus]);

    const isEntityFullyAvailable = useCallback((entityName: string) => {
        const isInCodeGenerating = isEntityInCodeGeneration(entityName);
        if(isInCodeGenerating){
            return false;
        }

        if(applicationStatus == AppStatusEvent.CODE_GENERATION_FAILED ||
            applicationStatus == AppStatusEvent.CODE_GENERATION_COMPLETED ||
            applicationStatus == AppStatusEvent.CODE_GENERATION_REVERTED ||
            applicationStatus == AppStatusEvent.SHUTDOWN
        ){
            return false;
        }

        return true;
    }, [isEntityInCodeGeneration, applicationStatus]);

    return useMemo(() => ({
        applicationStatus,
        entitiesInCodeGeneration,
        isEntityInCodeGeneration,
        isEntityFullyAvailable,
        isCodeGenerating
    }), [applicationStatus, entitiesInCodeGeneration, isEntityInCodeGeneration, isEntityFullyAvailable, isCodeGenerating]);
}