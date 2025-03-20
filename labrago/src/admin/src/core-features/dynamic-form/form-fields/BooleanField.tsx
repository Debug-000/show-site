"use client";


import { Box, FormControlLabel, Switch } from '@mui/material';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister, useController } from 'react-hook-form';;
import { FormField } from '@/core-features/dynamic-form/form-field';
import { useLiteController } from '../lite-controller';
import { useDynamicFormField } from '../use-dynamic-form-field';

interface BooleanFormComponentProps {
    //formField: FormField,
    name: string;
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
}
export function BooleanFormComponent(props: BooleanFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors } = props;


    // const defaultValue = control._formValues[name];
    const liteController = useLiteController({name, control, disabled});

    return (<>
        <Box
            border={0} padding={0}>
            <FormControlLabel
                name={name}
                control={<Switch checked={liteController.value ?? false} onChange={(_, checked: boolean) => {
                    liteController.onChange({ target: { name, value: checked } }) }
                } />
                }
                labelPlacement="start"
                label={label}
                disabled={disabled}

                sx={{
                    margin: 0,
                    padding: 0
                }} />
        </Box>
    </>)
}

interface FormFieldProps {
    name: string;
}
export function BooleanFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<BooleanFormComponent
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