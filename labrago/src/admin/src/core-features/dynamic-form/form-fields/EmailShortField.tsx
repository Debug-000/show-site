"use client";

import { TextField } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';


interface EmailFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    required: boolean;
    errors?: string;
}

export function EmailFormComponent(props: EmailFormComponentProps ) {
    const { name, label, placeholder, disabled, register, errors } = props;
    
    return (<>
        
            <TextField
                fullWidth
                {...register(name, { disabled:disabled })}
                label={label}
                placeholder={placeholder}
                error={!!errors}
                helperText={errors ?? null}
            />
        
    </>)
}


interface FormFieldProps {
    name: string;
}
export function EmailFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<EmailFormComponent
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