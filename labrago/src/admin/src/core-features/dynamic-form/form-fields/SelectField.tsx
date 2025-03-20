"use client";
import { FormField, Options } from '@/core-features/dynamic-form/form-field';
import { IconButton, InputAdornment, MenuItem, Select, TextField as MuiTextField, Tooltip, styled } from '@mui/material';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { useLiteController } from '../lite-controller';
import { selectValue } from '@/lib/utils/select-value';
import { ClearIcon } from '@mui/x-date-pickers/icons';
import { useRef } from 'react';
import { useDynamicFormField } from '../use-dynamic-form-field';

const TextField = styled(MuiTextField)(({ theme }) => ({
    '.MuiInputAdornment-root': {
        position: 'absolute',
        right: '32px',
        display: 'none',
    },
    '&:hover .MuiInputAdornment-root': {
        display: 'flex',
    }
}));

export const getValueFromOptions = (value: string | number | boolean | Record<string, any>, options: Options) => {
    var option = getOptionFromOptions(value, options);
    return option?.value;
}

export const getOptionFromOptions = (value: string | number | boolean | Record<string, any>, options: Options) => {

    if (!options) {
        return null;
    }

    if (Array.isArray(options)) {
        return options?.find(i => i.value == value);
    }

    const objectOption = options.options.find(i => selectValue(options.valueProp, i.value) == selectValue(options.valueProp, value));
    return objectOption;
}

export const getOptionsArray = (options: Options): Array<{ label: string, value: any }> => {
    if (!options) {
        return [];
    }

    if (Array.isArray(options)) {
        return options;
    }

    return options.options;
}

interface SelectFormComponentProps {
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
export function SelectFormComponent(props: SelectFormComponentProps) {
    const { name, label, options, placeholder, disabled, register, control, errors } = props;

    const liteController = useLiteController({ name, control, disabled });

    const value = getValueFromOptions(liteController.value, options) ?? null;


    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            disabled={disabled}
            value={value ?? ''}
            onChange={liteController.onChange}
            onBlur={liteController.onBlur}
            error={!!errors}
            helperText={errors}
            select

            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={() => liteController.onChange({ target: { name, value: null } })}>
                            <ClearIcon fontSize="inherit" />
                        </IconButton>
                    </InputAdornment>)

            }}>
            {getOptionsArray(options).map((option) => (
                <MenuItem
                    key={option.label}
                    value={option.value}
                >
                    {option.label}
                </MenuItem>
            ))}
        </TextField>)
}



interface FormFieldProps {
    name: string;
}
export function SelectFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;
    const formField = dynamicFormField.formField as Extract<FormField, { type: 'Select' }>;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<SelectFormComponent
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