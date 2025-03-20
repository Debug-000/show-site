import { optionsFromArray } from "@/lib/utils/form-util";
import { ChildTypeDescriptor, EntityChildTypes, FormFieldTypes } from "@/types/field-type-descriptor";
import { FormField} from "@/core-features/dynamic-form/form-field";
import { ArrayToJSON, BooleanToString, DateTimeToString, DateToString, MultilineToArray, NumberToString, StringToJSON, TimeToString } from "@/core-features/dynamic-form/value-convertor";
import { useMemo } from "react";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { useParamSingleValue } from "@/hooks/useParam";
import { useEntitiesDesignerSystemValidation } from "./use-designer-system-validation";

const hasUnique = (type: EntityChildTypes): boolean => {
    switch (type) {
        case "ShortText":
        case "Email":

        case "Integer":
        case "Decimal":
        case "Float":
            return true;
        default:
            return false;
    }
};

const hasMinMax = (type: EntityChildTypes): boolean => {
    switch (type) {
        case "Integer":
        case "Decimal":
        case "Float":
        case "DateTime":
        case "Date":
        case "Time":
            return true;
        default:
            return false;
    }
};

const hasDefault = (type: EntityChildTypes): boolean => {
    switch (type) {
        case "ShortText":
        case "LongText":
        case "SingleChoice":
        case "MultipleChoice":
        case "Email":
        case "Json":
        case "Integer":
        case "Decimal":
        case "Float":
        case "Boolean":
        case "DateTime":
        case "Date":
        case "Time":
            return true;
        default:
            return false;
    }
};

const hasOptions = (type: EntityChildTypes): boolean => {
    switch (type) {
        case "SingleChoice":
        case "MultipleChoice":
            return true;
        default:
            return false;
    }
};

const getDefaultType = (type: EntityChildTypes): FormFieldTypes => {
    switch (type) {
        case "Boolean":
            return "BooleanSelect";

        default:
            return type;
    }
};

export const useEntityTypeDesignerNewFieldSchema = (selectedChildTypeDescriptor: ChildTypeDescriptor, watch: (name?:string) => any, editId?: string) => {

    const entityName = useParamSingleValue('entity-id');
    const systemValidation = useEntitiesDesignerSystemValidation();
    const jWatch = JSON.stringify(watch());

    const schema = useMemo(() => {

        const defaultValue = watch("defaultValue");

        const items: dynamicLayoutItem<FormField> = {
            type: "group",
            direction: "vertical",
            gap: 1.5,
            key: "001",
            children: [
                {
                    data: {
                        type: "ShortText",
                        name: "caption",
                        label: "Caption",
                        required: true,
                        validator: [{
                            message: "Caption already exists",
                            fnct: (value: any) => { 
                                return systemValidation.validationChildCaptionExists(entityName!, value, editId) == false;
                            }
                        },{
                            message: "System reserved keyword",
                            fnct: (value: any) => { 
                                return systemValidation.validationChildCaptionKeyword(value) == false;
                            }
                        },{
                            message: "Caption must start with a letter",
                            fnct: (value: any) => { 
                                return systemValidation.validationStartsWithLetter(value) == false;
                            }
                        }]
                    },
                },
                {
                    type: "group",
                    direction: "horizontal",
                    key: "002",
                    children: [
                        {
                            data: {
                                type: "Boolean",
                                name: "required",
                                label: "Required",
                            },
                        },
                        ...(hasUnique(selectedChildTypeDescriptor.type) ? [{
                            data: {
                                type: "Boolean",
                                name: "unique",
                                label: "Unique",
                                enabled: defaultValue === undefined || defaultValue === null || defaultValue === '' || Number.isNaN(defaultValue)
                            },
                        }] : []) as dynamicLayoutItem<FormField>[]
                    
                    ],
                },
                {
                    type: "group",
                    direction: "horizontal",
                    visible: hasMinMax(selectedChildTypeDescriptor.type),
                    key: "004",
                    children: [
                        {
                            data: {
                                type: selectedChildTypeDescriptor.type,
                                name: "min",
                                label: "Min Value",
                                converter: (() => {
                                    switch(selectedChildTypeDescriptor.type){
                                        case "DateTime": return DateTimeToString;
                                        case "Date": return DateToString;
                                        case "Time": return TimeToString;
                                        
                                        case "Integer": 
                                        case "Float": 
                                        case "Decimal": return NumberToString;
                                    }
                                })()
                            },
                        },
                        {
                            data: {
                                type: selectedChildTypeDescriptor.type,
                                name: "max",
                                label: "Max Value",
                                converter: (() => {
                                    switch(selectedChildTypeDescriptor.type){
                                        case "DateTime": return DateTimeToString;
                                        case "Date": return DateToString;
                                        case "Time": return TimeToString;
                                        
                                        case "Integer": 
                                        case "Float": 
                                        case "Decimal": return NumberToString;
                                    }
                                })()
                            },
                        },
                    ],
                },
                {
                    data: {
                        type: "LongText",
                        name: "acceptedValues",
                        label: "Accepted Values",
                        visible: hasOptions(selectedChildTypeDescriptor.type),
                        required: true,
                        converter: MultilineToArray
                    },
                },
                {
                    data: {
                        type: getDefaultType(selectedChildTypeDescriptor.type),
                        min: watch("min") ?? null,
                        max: watch("max") ?? null,
                        options: optionsFromArray(MultilineToArray.pipe(watch("acceptedValues"))) ?? [],
                        name: "defaultValue",
                        label: "Default Value",
                        visible: hasDefault(selectedChildTypeDescriptor.type),
                        enabled: watch("unique") !== true,
                        converter: (() => {
                            switch(selectedChildTypeDescriptor.type){
                                case "DateTime": return DateTimeToString;
                                case "Date": return DateToString;
                                case "Time": return TimeToString;
                                
                                case "Integer": 
                                case "Float": 
                                case "Decimal": return NumberToString;
                                
                                case "Boolean": return BooleanToString;
                                
                                case "Json": return StringToJSON;

                                case "MultipleChoice": return ArrayToJSON;
                            }
                        })()
                    },
                }
            ],
        };

        return items;
    }, [selectedChildTypeDescriptor, editId, entityName, systemValidation, jWatch]);

    return schema;
}