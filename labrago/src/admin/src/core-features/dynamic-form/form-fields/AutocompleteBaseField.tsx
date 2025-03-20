"use client";

import { Autocomplete, AutocompletePopperSlotPropsOverrides, Button, Paper, Popper, PopperProps, SvgIcon, TextField, debounce, styled } from '@mui/material';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import Box from '@mui/material/Box';
import { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ObjectOption } from '@/core-features/dynamic-form/form-field';
import React from 'react';
import { useLiteController } from '../lite-controller';

interface AutocompleteFieldFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: Control;
    errors?: string;
    
    search: (search: string) => any;
    options: AutocompleteOptionValue[];
    customHeader: React.ReactNode;
    children?: React.ReactNode;
}
export function AutocompleteBaseFieldFormComponent(props: AutocompleteFieldFormComponentProps) {
    const { name, label, placeholder, disabled, control, register, errors, customHeader, search, options, children } = props;

    const liteController = useLiteController({ name, control, disabled });

    const debounceSearch = useCallback(debounce((searchValue: string) => {
        search(searchValue);
    }, 300), [search]);


    const StyledPopper = styled(Popper)(({ theme }) => ({
        width: '100%',
        zIndex: theme.zIndex.modal,
        borderColor: '#FF0000',//theme.palette.neutral![600],
        '& .MuiAutocomplete-paper': {
            margin: theme.spacing(0),
            borderRadius: 0,
            borderWidth: 0
        },
        '>.MuiPaper-root': {
            borderColor: theme.palette.neutral![600],
            borderWidth: 1,
            borderStyle:'solid',
            boxShadow: theme.shadows[10]
        }
    }));

    return (
        <Autocomplete
            id="google-map-demo"
            fullWidth
            sx={{width: '100%'}}
            filterOptions={(x) => x}
            options={options}
            autoComplete={false}
            includeInputInList
            disabled={disabled}
            filterSelectedOptions={false}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            value={liteController.value ?? null}
            noOptionsText="No data available"
            onChange={(event: any, newValue: AutocompleteOptionValue | null) => {
                // setOptions(newValue ? [newValue, ...options] : options);
                // setValue(newValue);
                liteController.onChange({ target: { name, value: newValue } })
                //search(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                //setInputValue(newInputValue);
                debounceSearch(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} 
                label={label} 
                fullWidth sx={{width: '100%'}} 
                error={!!errors}
                helperText={errors} />
            )}
            slots={{
                popper: (popperProps: PopperProps & AutocompletePopperSlotPropsOverrides) => {

                    return <StyledPopper {...popperProps} onMouseDown={event => event.preventDefault() } placement="bottom-start">
                        <Paper>

                            {customHeader}
                            
                            {typeof popperProps.children === 'function'
                                ? popperProps.children({placement: popperProps.placement!})
                                : popperProps.children}

                        </Paper>
                    </StyledPopper>
                }
            }}

            renderOption={(props, option: AutocompleteOptionValue) => {
                const { key, ...optionProps } = props;

                return (
                    <Box
                        key={option.value}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                    >

                        <Typography variant="body2" color="text.secondary">
                            {option.label}
                        </Typography>
                    </Box>
                );
            }}
        />
    );
}




export type AutocompleteOptionValue = ObjectOption<any> &
{
}