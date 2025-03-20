"use client";

import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { AutocompleteBaseFieldFormComponent, AutocompleteOptionValue } from './AutocompleteBaseField';
import { FormField, FormOpenMode } from '@/core-features/dynamic-form/form-field';
import { gql } from "@apollo/client";
import { SvgIcon } from '@mui/material';
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

const _ = gql`query mrAndreiSearchQuery($where: MrAndreiWhereInput) {
  mrAndreis(where: $where) {
    id,
    name,
    integer,
    createdAt,
    updatedAt
  }
}`;

interface RelationFIELDFormComponentProps {
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

export function LookupFIELDFormComponent(props: RelationFIELDFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors, entityName } = props;

    const myDialogContext = useMyDialogContext();

    const contentManagerSearch = useContentManagerSearch(entityName);
    const fullEntity = useFullEntity({ entityName });
    const contentManagerStore = useContentManagerStore({ entityName: entityName, fullEntity: fullEntity, searchState: contentManagerSearch.state });

    const search = useCallback((searchValue: string) => {
        contentManagerSearch.handleQueryChange(searchValue);
    }, [contentManagerSearch]);

    const value = control._formValues[name];
    
    const displayPropertyName = useMemo(() => fullEntity?.displayField?.name ?? 'name', [fullEntity?.displayField?.name]);

    const options = useMemo(() => {
        
        if (value) {
            return [value];
        }

        const result = contentManagerStore.state.data.map((i: any): AutocompleteOptionValue => ({
            label: i[displayPropertyName],
            value: { 
                connect: { 
                    id: i.id 
                }
            },
        }));

        return result;

    }, [contentManagerStore.state.data]);

    const addNew = () => {
        myDialogContext.addPopup(name, ContentManagerEntryDialogContent, { entityName }, FormOpenMode.New, undefined,
            (upperResults: any) => {
                return {
                    label: upperResults[displayPropertyName],
                    value: {
                        create: {
                            ...upperResults
                        }
                    }
                }
            })
    };

    return (
        <>
            <AutocompleteBaseFieldFormComponent
                name={name}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                register={register}
                control={control}
                errors={errors}
                search={search}
                options={options}

                customHeader={
                    <ActionList>
                        <ActionListItem
                            onClick={() => addNew()}
                            icon={(
                                <SvgIcon fontSize="small">
                                    <PlusCircleIcon />
                                </SvgIcon>
                            )}
                            aria-label="Add new entry"
                            aria-haspopup="dialog"
                            label="Add New"
                        />
                    </ActionList>
                }
            />
        </>
    );
}

interface FormFieldProps {
    name: string;
}
export function LookupFIELDFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;
    const formField = dynamicFormField.formField as Extract<FormField, { type: 'Relation' }>;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<LookupFIELDFormComponent
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