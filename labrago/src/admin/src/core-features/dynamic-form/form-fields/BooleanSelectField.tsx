"use client";

import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { SelectFormComponent } from './SelectField';
import { useMemo } from 'react';
import { Options } from '@/core-features/dynamic-form/form-field';
import { useDynamicFormField } from '../use-dynamic-form-field';

interface BooleanSelectFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
}

export function BooleanSelectFieldFormComponent(props: BooleanSelectFieldProps) {
    const { name, label, placeholder, disabled, register, control, errors, required } = props;

    const options = useMemo((): Options => {
        return [
            ...(required == false ? [{
                label: '- None -',
                value: null
            }] : [])
            ,{
                label: 'True',
                value: true
            },
            {
                label: 'False',
                value: false
            }
        ]
    }, [required]);

    return (
        <>
            <SelectFormComponent
                name={name}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                register={register}
                control={control}
                errors={errors}
                required={required}
                options={options}>

            </SelectFormComponent>
        </>
    );
}


interface FormFieldProps {
    name: string;
}
export function BooleanSelectFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<BooleanSelectFieldFormComponent
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