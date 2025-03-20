"use client";

import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { SelectFormComponent } from './SelectField';
import { useMemo } from 'react';
import { Options } from '@/core-features/dynamic-form/form-field';
import { useEntitiesDesigner } from '@/features/entity-type-designer/use-designer-entities';
import { useDynamicFormField } from '../use-dynamic-form-field';

interface EntitySelectorFIELDFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
}

export function EntitySelectorFIELDFormComponent(props: EntitySelectorFIELDFormComponentProps) {
    const { name, label, placeholder, disabled, required, register, control, errors } = props;

    const { allEntities } = useEntitiesDesigner();

    const options = useMemo((): Options => {
        return {
            options: allEntities.map((entity) => ({
                label: entity.caption!,
                value: {
                    name: entity.name,
                    caption: entity.caption,
                }
            })),
            valueProp: 'name'
        }
    }, [allEntities]);

    //const defaultValue = options.find(i => i.value.name == control?._formValues?.[name]?.name)?.value ?? '';

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
                options={options}
                required={required}>

            </SelectFormComponent>
        </>
    );
}

interface FormFieldProps {
    name: string;
}
export function EntitySelectorFIELDFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<EntitySelectorFIELDFormComponent
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