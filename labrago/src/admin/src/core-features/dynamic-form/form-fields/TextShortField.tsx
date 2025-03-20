"use client";

import { TextField } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';
import { useMemo } from 'react';


interface TextShortFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    required: boolean
    errors?: string;
}

export function TextShortFormComponent(props: TextShortFormComponentProps) {
    const { name, label, placeholder, disabled, register, errors } = props;

    return (<>

        <TextField
            fullWidth
            {...register(name, { disabled: disabled })}
            label={label}
            placeholder={placeholder}
            error={!!errors}
            inputProps={{ maxLength: 256 }}
            helperText={errors ?? null}
        />

    </>)
}

interface FormFieldProps {
    name: string;
}
export function TextShortFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<TextShortFormComponent
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