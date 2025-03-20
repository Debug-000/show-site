import { FormFieldTypes } from "@/types/field-type-descriptor";
import { FormField } from "@/core-features/dynamic-form/form-field";
import { compose } from "@/core-features/dynamic-form/value-convertor";

export const withFormDefaultValuesConverter = (defaultValue: Record<string, any>, formFields: FormField[]) => {

    // if(!defaultValue){
    //     return {};
    // }

    if(!formFields){
        return {};
    }
    
    let result: Record<string, any> = {
        
    }

    formFields.forEach((i) => {
        
        const originalValue = defaultValue?.[i.name];        
        
        if(i.defaultValue != undefined){
            result[i.name] = i.defaultValue;
        }

        if(originalValue != undefined) {
            result[i.name] = originalValue;
        }

        if(result[i.name] === undefined || result[i.name] === null){
            return;
        }

        if(!i.converter){
            return;
        }
       
        const convertedValue = compose(i.converter, i.tags)(result[i.name]);

        result[i.name] = convertedValue;
    })

    return result;
}