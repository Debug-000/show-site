import { useCallback, useMemo } from "react";
import { dynamicLayoutItem } from "../dynamic-layout/src/dynamic-layout"
import { FormField } from "./form-field"
import { collectDynamicLayoutItems } from "@/core-features/dynamic-layout/src/generate-dynamic-layout";
import { compose, pipe } from "./value-convertor";

interface useFormFieldConversionProps {
    schema: dynamicLayoutItem<FormField>
}
export const useFormFieldConversion = (props: useFormFieldConversionProps) => {

    const formFields = useMemo(() => collectDynamicLayoutItems<FormField>(props.schema), [props.schema]);

    const toFormCompose = useCallback((values: Record<string, any>) => {
        return fieldValueCompose(values, formFields);
    }, [formFields]);

    const fromFormPipe = useCallback((values: Record<string, any>) => {
        return fieldValuePipe(values, formFields);
    }, [formFields]);


    return useMemo(() => ({
        fromFormPipe,
        toFormCompose
    }), [pipe, compose]);
}


const fieldValuePipe = (value: Record<string, any>, formFields: FormField[]) => {

    if (!formFields) {
        return value;
    }

    const result = formFields.reduce((acc: Record<string, any>, formField: FormField) => {

        if(!formField.converter){
            return acc;
        }
        
        const originalFieldValue = value?.[formField.name];
        
        if(originalFieldValue === undefined){
            return acc;
        }

        const fieldValue = pipe(formField.converter, formField.tags)(originalFieldValue);
        
        return {
            ...acc, 
            [formField.name]: fieldValue
        };
    }, value);

    return result;
}


const fieldValueCompose = (value: Record<string, any>, formFields: FormField[]) => {

    if (!formFields) {
        return value;
    }

    const result = formFields.reduce((acc: Record<string, any>, formField: FormField) => {

        if(!formField.converter){
            return acc;
        }
        
        const originalFieldValue = value?.[formField.name];

        if(originalFieldValue === undefined){
            return acc;
        }
        const fieldValue = compose(formField.converter, formField.tags)(originalFieldValue);

        return {
            ...acc, 
            [formField.name]: fieldValue
        };
    }, value);

    return result;
};