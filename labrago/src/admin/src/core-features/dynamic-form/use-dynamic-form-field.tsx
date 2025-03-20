import { useMemo } from "react";
import { useDynamicFormContext } from "./dynamic-layout-form";
import { FormField } from "./form-field";
import { FieldErrors } from "react-hook-form";

export const useDynamicFormField = (fieldName: string) => {
    const dynamicFormContext = useDynamicFormContext()!;
    if(!dynamicFormContext){
        throw new Error('DynamicLayoutFormFields should be used inside a DynamicFormContext'); 
    }
    
    const visible = useMemo(() => dynamicFormContext.visibleItemsNames.indexOf(fieldName) >= 0, [dynamicFormContext.visibleItemsNames, fieldName]);
    const disabled = useMemo(() => dynamicFormContext.disabledItemsNames.indexOf(fieldName) >= 0, [dynamicFormContext.disabledItemsNames, fieldName]);
    const formField = useMemo(() => dynamicFormContext.formItemsMap[fieldName], [dynamicFormContext.formItemsMap, fieldName]);

    return useMemo(() => ({
        visible,
        disabled,
        formField,
        register: dynamicFormContext.register,
        control: dynamicFormContext.control,
        errors: dynamicFormContext.errors[fieldName],
    }), [visible, disabled, formField, dynamicFormContext.register, dynamicFormContext.control, dynamicFormContext.errors, fieldName]);
}