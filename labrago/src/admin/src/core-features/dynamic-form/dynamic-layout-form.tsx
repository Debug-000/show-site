import { Control, FieldError, FieldErrors, FieldErrorsImpl, Merge, UseFormRegister } from "react-hook-form";
import { Stack } from "@mui/material";
import { renderDynamicLayout } from "@/core-features/dynamic-layout/src/generate-dynamic-layout";
import { FormElementsMap } from "./form-elements-maps";
import { FormField, FormOpenMode, Options } from "@/core-features/dynamic-form/form-field";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useDynamicForm } from "./use-dynamic-form";



// DynamicFormContext.tsx
interface DynamicFormContextType {
    register: UseFormRegister<any>;
    control: Control;
    errors: Record<string, string>;
    visibleItemsNames: Array<string>;
    disabledItemsNames: Array<string>;
    layoutItems?: dynamicLayoutItem<FormField>;
    formItemsMap: Record<string, FormField>;
}
const DynamicFormContext = createContext<DynamicFormContextType | null>(null);
export const useDynamicFormContext = () => useContext(DynamicFormContext);

interface DynamicFormProps {
    openMode?: FormOpenMode,
    defaultValue?: any,
    layoutItems: dynamicLayoutItem<FormField>,
    onSubmit: (data: any) => void,
}
export const FormProvider = (props: PropsWithChildren<DynamicFormProps>) => {
    const dynamicForm = useDynamicForm({ initialOpenMode: props.openMode ?? FormOpenMode.New, initialLayout: props.layoutItems, defaultValue: props.defaultValue });

    useEffect(() => {
        console.log('dynamicForm.layoutItems', dynamicForm.layoutItems);
    }, [dynamicForm])

    return (<DynamicFormContext.Provider value={dynamicForm}>
        <form onSubmit={dynamicForm.handleSubmit(props.onSubmit)} >
            {props.children}
        </form>
    </DynamicFormContext.Provider>)
}


interface DynamicLayoutFormFieldsProps {
    dynamicForm: DynamicFormContextType;
}
export const DynamicLayoutFormFields = (props: DynamicLayoutFormFieldsProps) => {

    return (

        <DynamicFormContext.Provider value={props.dynamicForm}>
            <Stack spacing={2}>
                {renderDynamicLayout(props.dynamicForm.layoutItems, (data: FormField) => {
                 
                    return (
                        <FormElementComponentMapper
                            key={'dynamic_layout_form' + data.name}
                            formField={data}
                       />
                    );
                })}
            </Stack>
        </DynamicFormContext.Provider>
    );
};

interface FormElementComponentProps {
    formField: FormField;
}
const FormElementComponentMapper = (props: FormElementComponentProps) => {

    const { formField } = props;

    let DesignerElement = FormElementsMap[formField.type];

    if (!DesignerElement) {
        console.log('Form Field type not found', formField.type);
        DesignerElement = FormElementsMap.ShortText;
    }

    return (
        <DesignerElement
            name={formField.name}
            label={formField.label}
            placeholder={formField.placeholder}
        />
    );
};
