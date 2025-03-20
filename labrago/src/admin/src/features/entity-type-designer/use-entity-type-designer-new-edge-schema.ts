import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { ChildTypeDescriptor } from "@/types/field-type-descriptor";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useCallback, useMemo } from "react";
import { useParamSingleValue } from "@/hooks/useParam";
import { useEntitiesDesignerSystemValidation } from "./use-designer-system-validation";

export const useEntityTypeDesignerNewEdgeSchema = (selectedChildTypeDescriptor: ChildTypeDescriptor, watch: (name?:string) => any, editId?: string) => {

    const entityName = useParamSingleValue('entity-id');
    const systemValidation = useEntitiesDesignerSystemValidation();
    const jWatch = JSON.stringify(watch());

    const schema = useMemo(() => {
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
                }, {
                    data: {
                        type: "Select",
                        name: "relationType",
                        label: "Relation Type",
                        required: true,
                        options: [{
                            label: "One",
                            value: "One"
                        }, {
                            label: "Many",
                            value: "Many"
                        }, {
                            label: "One To One",
                            value: "OneToOne"
                        }, {
                            label: "One To Many",
                            value: "OneToMany"
                        }, {
                            label: "Many To One",
                            value: "ManyToOne"
                        }, {
                            label: "Many To Many",
                            value: "ManyToMany"
                        }],
                        defaultValue: "One",
                        enableOnMode: [FormOpenMode.New],
                    },
                }, {
                    type: "group",
                    direction: "horizontal",
                    key: "002",
                    children: [{
                            data: {
                                type: "EntitySelector",
                                name: "relatedEntity",
                                label: "Related Entity",
                                enableOnMode: [FormOpenMode.New],
                                required: true,
                            },
                        }, {
                            data: {
                                type: "ShortText",
                                name: "belongsToCaption",
                                label: "Caption",
                                enableOnMode: [FormOpenMode.New],
                                visible: watch('relationType') == "OneToOne"
                                    || watch('relationType') == "OneToMany"
                                    || watch('relationType') == "ManyToOne"
                                    || watch('relationType') == "ManyToMany",
                                required: true,
                            },
                        }
                    ]
                },
                {
                    data: {
                        type: "Boolean",
                        name: "required",
                        label: "Required"
                    },
                }
            ],
        };

        return items;
    }, [editId, entityName, systemValidation, watch, selectedChildTypeDescriptor, jWatch]);

    return schema;
}
