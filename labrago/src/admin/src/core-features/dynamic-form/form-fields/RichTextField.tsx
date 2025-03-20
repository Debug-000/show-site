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

interface RichTextInputProps{
    id?: string;
    value?: string;
    onChange?: (editorState: any) => void;
    placeholder?: string;
}
const RichTextInput = forwardRef((props: RichTextInputProps, ref) => {

    const {id, onChange, value} = props;
    const inputRef = useRef<HTMLInputElement>(null);

   
    const change = useCallback((newValue: string) => {
        onChange?.(newValue);
    }, [onChange]);

    // Expose HTMLInputElement properties and methods
    useImperativeHandle(ref, () => ({
    
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        select: () => inputRef.current?.select(),
        setCustomValidity: (message: any) => inputRef.current?.setCustomValidity(message),
        reportValidity: () => inputRef.current?.reportValidity(),
        get value() {
            return inputRef.current!.value;
        },
        set value(val) {
            inputRef.current!.value = val;
        },
        get validity() {
            return inputRef.current?.validity;
        },
        // Add more methods as needed to fulfill the HTMLInputElement interface
    }));

    return (

        <LexicalFullEditor 
            id={id}
            value={value}
            onChange={change}
            htmlInputElementRef={inputRef} 
            placeholder={props.placeholder} />
    );
});
RichTextInput.displayName = 'RichTextInput';


interface RichTextFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
}

export function RichTextFormComponent(props: RichTextFormComponentProps) {
    const { name, label, placeholder, disabled, register, errors, control } = props;


    const liteController = useLiteController({ name, control, disabled });

    const [focused, setFocused] = useState<boolean>(false);

    const id = useId();
    
    return (<>

        <FormControl fullWidth variant="filled" focused={focused} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <InputLabel htmlFor={id} id="demo-simple-select-label">{label}</InputLabel>
            <ComponentField
                id={id}
                componentType={RichTextInput}
                componentTypeProps={{
                    value: liteController.value,
                    onChange:(value: string) => {
                        liteController.onChange({ target: { name, value } })
                    }
                }}>
            </ComponentField>
        </FormControl>
    </>)
}

interface FormFieldProps {
    name: string;
}
export function RichTextFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<RichTextFormComponent
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