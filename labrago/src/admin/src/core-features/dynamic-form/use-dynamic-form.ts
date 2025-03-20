import { createYupSchema } from "@/lib/utils/create-yup-schema";
import { collectDynamicLayoutItems } from "@/core-features/dynamic-layout/src/generate-dynamic-layout";
import yup from "@/lib/yup";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { withFormDefaultValuesConverter } from "@/core-features/dynamic-form/HOC/with-form-default-values-converter";
import { withYupResolverConverter } from "@/core-features/dynamic-form/HOC/with-yup-resolver-converter";
import { useEffectDefaultValuesSet } from "./use-effect-default-values-set";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";

interface useDynamicFormProps {
    initialOpenMode: FormOpenMode | undefined,
    defaultValue?: any,
    initialLayout?: dynamicLayoutItem<FormField>,
}
export const useDynamicForm = (props: useDynamicFormProps) => {

    const { initialOpenMode, defaultValue, initialLayout } = props;
    const [openMode, setOpenMode] = useState<FormOpenMode>(initialOpenMode ?? FormOpenMode.New);
    const [layoutItems, setLayoutItems] = useState<dynamicLayoutItem<FormField> | undefined>(initialLayout);
    const formItems = useMemo(() => collectDynamicLayoutItems<FormField>(layoutItems), [layoutItems]);
    const [watchedValues, setWatchedValues] = useState<Record<string, any>>({});

    const formItemsMap = useMemo(() => formItems.reduce((acc: Record<string, FormField>, formItem: FormField) => {
        acc[formItem.name] = formItem;
        return acc;
    }, {}), [formItems]);

    const visibleItemsNames = useMemo(() => {
        return formItems
            .filter((item) => {
                if (item.visible === false) {
                    return false;
                }

                if (item.visibleOnMode){
                    if(item.visibleOnMode.indexOf(openMode) < 0) {
                        return false;
                    }
                }

                return true;
            })
            .map((i) => i.name);
    }, [formItems, openMode]);

    const disabledItemsNames = useMemo(() => {
        return formItems
            .filter((item) => {
                if (item.enabled === false) {
                    return true;
                }

                if (item.enableOnMode) {
                    if (item.enableOnMode.indexOf(openMode) < 0) {
                        return true;
                    }
                }

                return false;
            })
            .map((i) => i.name);
    }, [formItems, openMode]);


    const yupSchema = useMemo(() => {

        const formItemsWithValidation = formItems
            .filter((item) => visibleItemsNames.indexOf(item.name) >= 0)
            .filter((item) => disabledItemsNames.indexOf(item.name) < 0);

        const updatedSchema = formItemsWithValidation.reduce(createYupSchema, {});
        return yup.object().shape(updatedSchema);

    }, [formItems, disabledItemsNames, visibleItemsNames]);

    
    const yupResolverConverter = useMemo(() => withYupResolverConverter(yupResolver(yupSchema), yupSchema), [yupSchema]);
    
    const { register, handleSubmit, formState: { errors }, reset, watch, control, getValues, setValue } = useForm({
        mode: "all",
        shouldUnregister: true,
        resolver: yupResolverConverter
    });

    const defaultValueWithConversion = useMemo(() => withFormDefaultValuesConverter(defaultValue, formItems), [defaultValue, formItems]);

    useEffectDefaultValuesSet(defaultValueWithConversion, () => {
        reset(defaultValueWithConversion);
        setWatchedValues(defaultValueWithConversion);
    });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!name) {
                return;
            }

            if (!control._names.watch.has(name)) {
                return;
            }

            let result = {
                ...watchedValues,
                [name]: value[name],
            };

            if (JSON.stringify(watchedValues) == JSON.stringify(result)) {
                return;
            }
            setWatchedValues(result);
        });
        return () => subscription.unsubscribe();
    }, [setWatchedValues, watchedValues, watch, control._names.watch]);

    const watchValue = useCallback((key?: string) => {
        
        if(!key){
            return watchedValues;
        }

        const _ = watch(key);

        const value = watchedValues[key];
        return value;

    }, [watch, watchedValues])


    const minimalErrors = Object.keys(errors).reduce((acc: any, key: string) => {
        acc[key] = errors[key]?.message;
        return acc;
    }, {}) as Record<string, string>;

    return useMemo(() => {
        return {
        layoutItems,
        formItemsMap,
        setLayoutItems,
        register,
        control,
        handleSubmit,
        errors: minimalErrors,
        reset,
        watch: watchValue,
        setValue,
        getValues,
        setOpenMode,
        visibleItemsNames,
        disabledItemsNames
    }}, [layoutItems, formItemsMap, setLayoutItems, register, control, handleSubmit, minimalErrors, reset, watchValue, setValue, getValues, setOpenMode, disabledItemsNames, visibleItemsNames]);
};
