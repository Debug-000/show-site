import { getOptionsArray, getValueFromOptions } from "@/core-features/dynamic-form/form-fields/SelectField";
import { getValuesFromOptions } from "@/core-features/dynamic-form/form-fields/TagsSelectField";
import { MultilineToArray } from "@/core-features/dynamic-form/value-convertor";
import { optionsFromArray } from "@/lib/utils/form-util";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form"

interface useUpdateValueBasedOnDependenciesProps {
    watch: (name?:string) => any
    setValue: UseFormSetValue<{ [key: string]: any; }>;
}
export const useUpdateValueBasedOnDependencies = (props: useUpdateValueBasedOnDependenciesProps) => {
    const { watch,  setValue} = props;
    
    const acceptedValues = watch('acceptedValues')

    useEffect(() => {

        const allFormValues = watch();
        const defaultValue = allFormValues['defaultValue'];
        if(!defaultValue){
            return;
        }

        const options = optionsFromArray(MultilineToArray.pipe(watch("acceptedValues"))) ?? [];
        const refOptions = getOptionsArray(options);
        if (!refOptions.length) {
            return;
        }

        //multi-value
        if(Array.isArray(defaultValue)){

            let refValue = getValuesFromOptions(defaultValue, options);

            if(JSON.stringify(defaultValue) === JSON.stringify(refOptions)){
                return;
            }
            if(refValue?.length){
                setValue('defaultValue', refValue);
            } else {
                setValue('defaultValue', null);
            }

        } else {
            let refValue = getValueFromOptions(defaultValue, options);

            if (refValue != null) {
                return;
            }
    
            setValue('defaultValue', null);
        }

    }, [acceptedValues, setValue, watch]);
}