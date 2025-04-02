"use client";

import { Box, FilledInput, FormControl, Input, InputBase, InputLabel, TextField } from '@mui/material';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useLiteController } from '../lite-controller';
import { ComponentField } from './ComponentField';
import { LexicalFullEditor } from '@/shared/components/lexical-wrapper/lexical-full-editor';
import useId from '@mui/material/utils/useId';
import { useDynamicFormField } from '../use-dynamic-form-field';
import { FormField } from '../form-field';

interface PasswordFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: unknown;
    required: boolean
    errors?: string;
}

export function PasswordFormComponent(props: PasswordFormComponentProps) {
    const { name, label, placeholder, disabled, register, errors } = props;

    return (<>

        <TextField
            fullWidth
            {...register(name, { disabled: disabled })}
            type="password"
            label={label}
            placeholder={placeholder}
            error={!!errors}
            inputProps={{ maxLength: 256 }}
            helperText={errors ?? null}
        />

    </>)
}
PasswordFormComponent.displayName = 'RichTextInput';



interface PasswordFormField {
    name: string;
}
export function PasswordFormField(props: PasswordFormField) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<PasswordFormComponent
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