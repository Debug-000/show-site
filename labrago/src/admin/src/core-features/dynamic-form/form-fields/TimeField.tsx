"use client";

import { TextField } from '@mui/material';
import { Control, Controller, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { FormField } from '@/core-features/dynamic-form/form-field';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { localeConfig } from '@/config/locale-config';
import { DateTimeToolbar } from '../pickers-extensions/date-time-toolbar';
import { DateTimeTextField } from '../pickers-extensions/date-time-textfield';
import { useLiteController } from '../lite-controller';
import { useDynamicFormField } from '../use-dynamic-form-field';

interface TimeFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegister<any>;
    control: Control;
    errors?: string;
    min?: string;
    max?: string;
    required: boolean;
}
export function TimeFormComponent(props: TimeFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors, min, max } = props;

    const liteController = useLiteController({ name, control });

    return (<>
        <TimePicker
            name={name}
            format={localeConfig.time.displayFormat}
            label={label}
            disabled={disabled}
            minTime={min ? dayjs(min) : undefined}
            maxTime={max ? dayjs(max) : undefined}

            value={liteController.value ?? null}
            onChange={(value) => {
                liteController.onChange({ target: { name, value } })
            }}

            slots={{
                textField: DateTimeTextField,
                toolbar: DateTimeToolbar as any,
                //actionBar: DateTimeActionbar,
            }}
            slotProps={{
                actionBar: { actions: ['clear', 'accept'] },
                toolbar: {
                    formValue: control._formValues[name]
                },
                textField: {
                    fullWidth: true,
                    error: !!errors,
                    helperText: errors,
                    inputFormat: (value: any) => value.format(localeConfig.time.inputFormat),
                    formValue: control._formValues[name]
                } as any,
                popper: {
                    placement: "bottom-end",
                        popperOptions: {
                            modifiers: [
                                  {
                                    name: 'preventOverflow',
                                    enabled: true,
                                    options: {
                                      altAxis: true,
                                      altBoundary: false,
                                      tether: false,
                                      rootBoundary: 'viewport',
                                      padding: 0,
                                    },
                                  },
                            ]
                        }
                }
            }}
        />
    </>)
}

interface FormFieldProps {
    name: string;
}
export function TimeFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }
    
    return (<TimeFormComponent
        name={props.name}
        label={dynamicFormField.formField.label}
        placeholder={dynamicFormField.formField.placeholder}
        disabled={dynamicFormField.disabled}
        register={dynamicFormField.register}
        control={dynamicFormField.control}
        required={dynamicFormField.formField.required ?? false}
        errors={dynamicFormField.errors}

        min={dynamicFormField.formField.min}
        max={dynamicFormField.formField.max}
    />)
}


declare module '@mui/x-date-pickers/internals' {
    interface ExportedBaseToolbarProps {
        formValue: any;
    }
}