"use client";
import { FormField, Options } from '@/core-features/dynamic-form/form-field';
import { Box, Chip, FilledInput, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Theme, useTheme } from '@mui/material';
import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { Control, Controller, FieldError, FieldErrorsImpl, Merge, UseFormRegister, useWatch } from 'react-hook-form';
import { useLiteController } from '../lite-controller';
import { selectValue } from '@/lib/utils/select-value';
import { getOptionsArray } from './SelectField';
import CheckIcon from '@mui/icons-material/Check';
import { useDynamicFormField } from '../use-dynamic-form-field';

export const getValuesFromOptions = (value: Array<string | number | boolean | Record<string, any>>, options: Options):
                                    (string | number | boolean | Record<string, any>)[] => {

    var option = getOptionsFromOptions(value, options);
    return option?.map(i => i?.value ?? null).filter(i => i != null) ?? [];
}

export const getOptionsFromOptions = (value: Array<string | number | boolean | Record<string, any>>, options: Options) => {

    if (!options) {
        return null;
    }

    if (!value || !value.length) {
        return null;
    }

    if (Array.isArray(options)) {
        // We need to ensure the result is in the same order as the 'value' array.
        // This is why the code might look more complicated:
        return value.map(val => options.find(option => option.value === val)).filter(Boolean);
    }

    //const objectOption = options.options.filter(i => value.map(v => selectValue(options.valueProp, v) ).includes(selectValue(options.valueProp, i.value))  );
    //const objectOption = value.filter(i => options.options.map(v => selectValue(options.valueProp, v) ).includes(selectValue(options.valueProp, i))  );
    const objectOption = value.map(v => {
        // For each item in 'value', we find the corresponding option in 'options.options'
        return options.options.find(i =>
            selectValue(options.valueProp, v) === selectValue(options.valueProp, i.value)
        );
    }).filter(Boolean);

    return objectOption;
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


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

export function TagsSelectFormComponent(props: SelectFormComponentProps) {
    const { name, label, options, placeholder, disabled, register, control, errors } = props;

    const liteController = useLiteController({ name, control, disabled });

    const value = getValuesFromOptions(liteController.value, options) ?? null;

    const id = useId();

    return (
        <FormControl fullWidth variant="filled">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                multiple
                value={value ?? []}
                onChange={liteController.onChange}
                input={<FilledInput fullWidth id={id} sx={{ padding: '4px' }} />}
                renderValue={(selected: Array<string | number | boolean | Record<string, any>>) => {

                    const selectedOptions = getOptionsFromOptions(selected, options);

                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedOptions?.map((selectedOption) => (
                            <Chip key={selectedOption!.label} label={selectedOption!.label} />
                        ))}
                    </Box>

                }}
                MenuProps={MenuProps}
            >
                {getOptionsArray(options).map((option) => (
                    <MenuItem
                        key={option.label}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}


interface FormFieldProps {
    name: string;
}
export function TagsSelectFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;
    const formField = dynamicFormField.formField as Extract<FormField, { type: 'TagsSelect'}>;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<TagsSelectFormComponent
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
