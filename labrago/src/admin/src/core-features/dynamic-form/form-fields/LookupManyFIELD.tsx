"use client";

import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { AutocompleteBaseFieldFormComponent, AutocompleteOptionValue } from './AutocompleteBaseField';
import { FormField, FormOpenMode } from '@/core-features/dynamic-form/form-field';
import { gql } from "@apollo/client";
import { SvgIcon, TextField } from '@mui/material';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import { useCallback, useContext, useMemo } from 'react';
import { ChainDialogContext } from '../../dynamic-dialog/src/dynamic-dialog';
import { ContentManagerEntryDialogContent } from '@/features/content-manager/content-manager-new-item';
import { ActionList } from '@/shared/components/action-list';
import { ActionListItem } from '@/shared/components/action-list-item';
import { useFullEntity } from '@/hooks/use-entities';
import { useDynamicFormField } from '../use-dynamic-form-field';
import { useContentManagerSearch } from '@/hooks/use-content-manager-search';
import { useContentManagerStore } from '@/hooks/use-content-manager-store';
import { useMyDialogContext } from '@/core-features/dynamic-dialog/src/use-my-dialog-context';

interface RelationManyFIELDFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: Control;
    required: boolean;
    errors?: string;
    entityName: string;
}

export function LookupManyFIELDFormComponent(props: RelationManyFIELDFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors, entityName } = props;

    return (
        <>
            <TextField
                fullWidth
                disabled={true}
                defaultValue="NOT IMPLEMENTED"
                label={label}
                placeholder={placeholder}
                error={!!errors}
                inputProps={{ maxLength: 256 }}
                helperText={errors ?? null}
            />
        </>
    );
}

interface FormFieldProps {
    name: string;
}
export function LookupManyFIELDFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;
    const formField = dynamicFormField.formField as Extract<FormField, { type: 'RelationMany' }>;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<LookupManyFIELDFormComponent
        name={props.name}
        label={dynamicFormField.formField.label}
        placeholder={dynamicFormField.formField.placeholder}
        disabled={dynamicFormField.disabled}
        register={dynamicFormField.register}
        control={dynamicFormField.control}
        required={dynamicFormField.formField.required ?? false}
        errors={dynamicFormField.errors}

        entityName={formField.entityName}
    />)
}