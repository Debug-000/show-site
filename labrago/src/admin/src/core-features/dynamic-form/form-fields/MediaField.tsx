"use client";

import { TextField } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';


interface MediaFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    required: boolean;
    errors?: string;
}

export function MediaFormComponent(props: MediaFormComponentProps) {
    const { name, label, placeholder, disabled, register, errors } = props;
    
    return (<>
        
            MEDIA
        
    </>)
}

interface FormFieldProps {
    name: string;
}
export function MediaFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<MediaFormComponent
        name={props.name}
        label={dynamicFormField.formField.label}
        placeholder={dynamicFormField.formField.placeholder}
        disabled={dynamicFormField.disabled}
        register={dynamicFormField.register}
        control={dynamicFormField.control}
        required={dynamicFormField.formField.required ?? false}
        errors={dynamicFormField.errors}
    />)
}