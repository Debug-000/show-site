"use client";

import { Control, FieldError, FieldErrorsImpl, Merge, useController, useFormContext, UseFormRegister } from 'react-hook-form';
import { getValueFromOptions, getOptionsArray, SelectFormComponent } from './SelectField';
import { useEffect, useMemo } from 'react';
import { FormField, Options } from '@/core-features/dynamic-form/form-field';
import { useLiteController } from '../lite-controller';
import { TagsSelectFormComponent } from './TagsSelectField';
import { useDynamicFormField } from '../use-dynamic-form-field';

interface BooleanSelectFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    options: Options;
    errors?: string;
}

export function MultipleChoiceFieldFormComponent(props: BooleanSelectFieldProps) {
    const { name, label, placeholder, disabled, register, control, errors, required, options } = props;

    return (
        <>
            <TagsSelectFormComponent
                name={name}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                register={register}
                control={control}
                errors={errors}
                required={required}
                options={options}
            />
        </>
    );
}

interface FormFieldProps {
    name: string;
}
export function MultipleChoiceFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;
    const formField = dynamicFormField.formField as Extract<FormField, { type: 'MultipleChoice' }>;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<MultipleChoiceFieldFormComponent
        name={props.name}
        label={dynamicFormField.formField.label}
        placeholder={dynamicFormField.formField.placeholder}
        disabled={dynamicFormField.disabled}
        register={dynamicFormField.register}
        control={dynamicFormField.control}
        required={dynamicFormField.formField.required ?? false}
        errors={dynamicFormField.errors}

        options={formField.options}
    />)
}