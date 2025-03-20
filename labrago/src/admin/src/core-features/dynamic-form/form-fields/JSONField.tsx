"use client";

import { TextField } from '@mui/material';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';


interface JSONFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
}

export function JSONFormComponent(props: JSONFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors } = props;

    const multiline = control._formValues[name]?.indexOf('\n') > 0;
    return (<>

            <TextField
            fullWidth
            {...register(name, { disabled:disabled })}
            label={label}
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
export function JSONFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<JSONFormComponent
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