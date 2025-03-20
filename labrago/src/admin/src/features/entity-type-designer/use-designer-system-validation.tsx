import { use, useCallback, useMemo } from "react";
import { useEntitiesDesigner } from "./use-designer-entities";
import { ENTITY_CHILDREN_SYSTEM_KEYWORDS, ENTITY_SYSTEM_KEYWORDS } from "@/config/CONST";
import pluralize from "pluralize";

export const useEntitiesDesignerSystemValidation = () => {

    const entitiesDesigner = useEntitiesDesigner();

    const validationCaptionIsSingular = useCallback((caption: string): boolean => {

        const pluralisedCaption = pluralize(caption);
    
        if(pluralisedCaption == caption){
            return true;
        }
        return false;
    }, []);

    const validationChildCaptionExists = useCallback((entityName: string, caption: string, editId?: string) => {

        const normalizedCaption  = caption.replace(/[\s_]/g, "")
                                            .toLocaleLowerCase();

        const entityChildren = entitiesDesigner.allFullEntitiesMap[entityName!].children;
        const existingField = entityChildren?.find(i => i.caption.toLocaleLowerCase() == normalizedCaption && i.name != editId);
        return !!existingField;
    }, [entitiesDesigner.allFullEntitiesMap]);

    const validationChildCaptionKeyword = useCallback((caption: string) => {

        const normalizedCaption  = caption.replace(/[\s_]/g, "")
                                            .toLocaleLowerCase();
                                            
        const isSystemKeyword = ENTITY_CHILDREN_SYSTEM_KEYWORDS.indexOf(normalizedCaption) >= 0;
        return isSystemKeyword;
    }, []);

    const validationEntityCaptionExists = useCallback((caption: string, editId?: string) => {
        const normalizedCaption  = caption.replace(/[\s_]/g, "")
                                            .toLocaleLowerCase();
                                            
        const existingField = entitiesDesigner.allEntities?.find(i => i.caption?.toLocaleLowerCase() == normalizedCaption && i.name != editId);
        return !!existingField;
    }, [entitiesDesigner.allEntities]);

    const validationEntityCaptionKeyword = useCallback((caption: string) => {
        const normalizedCaption  = caption.replace(/[\s_]/g, "")
                                            .toLocaleLowerCase();
                                            
        const isSystemKeyword = ENTITY_SYSTEM_KEYWORDS.indexOf(normalizedCaption) >= 0;
        return isSystemKeyword;
    }, []);

    const validationStartsWithLetter = useCallback((caption: string) => {
        if(!caption){
            return false;
        }
        const firstLetter = caption.charAt(0);
        return firstLetter.toLocaleLowerCase() == firstLetter.toLocaleUpperCase();
    },[]);

    return useMemo(() => ({
        
        validationCaptionIsSingular,
        validationChildCaptionExists,
        validationChildCaptionKeyword,

        validationEntityCaptionExists,
        validationEntityCaptionKeyword,

        validationStartsWithLetter
    }), [validationCaptionIsSingular, validationChildCaptionExists, validationChildCaptionKeyword, validationEntityCaptionExists, validationEntityCaptionKeyword, validationStartsWithLetter]);
}