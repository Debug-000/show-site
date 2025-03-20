"use client";

import { TextField } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';


interface NumberFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    min?: number;
    max?: number;
    required: boolean;
    errors?: string;
}

export function NumberFormComponent(props: NumberFormComponentProps) {
    const { name, label, placeholder, disabled, register, errors, min, max } = props;
    
    var minValue = min ?? -2147483648;
    var maxValue = max ?? 2147483647;    

     
    return (<>
        
            <TextField
                
                fullWidth
                type='number'
                {...register(name, { disabled:disabled, valueAsNumber: true })}
                label={label}
                placeholder={placeholder}
                error={!!errors}
                inputProps={{ min: minValue, max: maxValue }}
                helperText={errors}
            />
        
    </>)
}

interface FormFieldProps {
    name: string;
}
export function NumberFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<NumberFormComponent
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