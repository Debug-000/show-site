"use client";


import {
    Control,
    ControllerFieldState,
    ControllerRenderProps,
    FieldError,
    FieldErrorsImpl, Merge,
    UseFormRegister
} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { localeConfig } from "@/config/locale-config";
import { DateTimeToolbar } from '../pickers-extensions/date-time-toolbar';
import { DateTimeTextField } from "../pickers-extensions/date-time-textfield";
import { useLiteController } from "../lite-controller";
import { useDynamicFormField } from "../use-dynamic-form-field";


interface DateTimeFormComponentProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<any>;
    control: Control;
    min?: string;
    max?: string;
    required: boolean;
    errors?: string;
}
export function DateTimeFormComponent(props: DateTimeFormComponentProps) {
    const { name, label, placeholder, disabled, register, control, errors, min, max } = props;

    const liteController = useLiteController({ name, control, disabled });

    return (
        <>

            <DateTimePicker
                name={name}
                label={label}
                disabled={disabled}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                minDate={min ? dayjs(min) : undefined}
                maxDate={max ? dayjs(max) : undefined}

                value={liteController.value ?? null}
                onChange={(value) => {
                    liteController.onChange({ target: { name, value } })
                }}
                
                slots={{
                    textField: DateTimeTextField,
                    toolbar: DateTimeToolbar as any,
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
                        inputFormat: (value: any) => value.format(localeConfig.dateTime.inputFormat),
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

        </>
    );
}


interface FormFieldProps {
    name: string;
}
export function DateTimeFormField(props: FormFieldProps) {
    const dynamicFormField = useDynamicFormField(props.name)!;

    if(dynamicFormField.visible == false){
        return null;
    }

    return (<DateTimeFormComponent
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
