"use client";

import { TextField } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';


interface TextLongFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    required: boolean;
    errors?: string;
}

export function TextLongFormComponent(props: TextLongFormComponentProps ) {
    const { name, label, placeholder, disabled, register, errors } = props;

    return (<>

            <TextField
                fullWidth
                {...register(name, { disabled:disabled })}
                label={label}
                disabled={disabled}
                placeholder={placeholder}
                error={!!errors}
                inputProps={{ maxLength: 16777215 }}
                helperText={errors}
                multiline
                minRows={3}
                maxRows={6}
            />

    </>)
}


interface FormFieldProps {
    name: string;
}
export function TextLongFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<TextLongFormComponent
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
