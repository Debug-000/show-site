import { Field, GetEntityFirstLevelSchemaQuery } from "@/lib/apollo/graphql";
import { FieldScalarTypes } from "@/types/field-type-descriptor";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useMemo } from "react";
import { ArrayToJSON, DateTimeToString, DateToString, EmptyStringToNull, LookupToGraphQlFormat, NumberToString, StringToJSON, TimeToString } from "@/core-features/dynamic-form/value-convertor";
import { dynamicLayoutItem, dynamicLayoutItem_Group, dynamicLayoutItem_Item } from "@/core-features/dynamic-layout/src/dynamic-layout";

const getFieldByType = (field: Field): FormField => {
    switch (field.type) {
        case "ShortText":
        case "LongText":
        case "RichText":
        case "Email":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                required: field.required ?? false,
                defaultValue: field.defaultValue,
            })
        case "Integer":
        case "Decimal":
        case "Float":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                min: NumberToString.compose(field.min),
                max: NumberToString.compose(field.max),
                defaultValue: NumberToString.compose(field.defaultValue),
                required: field.required ?? false,
            })
        case "DateTime":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                min: DateTimeToString.compose(field.min),
                max: DateTimeToString.compose(field.max),
                defaultValue: field.defaultValue,
                required: field.required ?? false,
                converter: DateTimeToString
            })

        case "Date":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                min: DateToString.compose(field.min),
                max: DateToString.compose(field.max),
                defaultValue: field.defaultValue,
                required: field.required ?? false,
                converter: DateToString
            })

        case "Time":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                min: TimeToString.compose(field.min),
                max: TimeToString.compose(field.max),
                defaultValue: field.defaultValue,
                required: field.required ?? false,
                converter: TimeToString
            })
        case "media":
        case "Boolean":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                required: field.required ?? false
            })
        case "Json":
            return ({
                type: field.type as FieldScalarTypes,
                name: field.name,
                label: field.caption,
                required: field.required ?? false,
                defaultValue: field.defaultValue,
                converter: StringToJSON
            })
        case "SingleChoice":
            return ({
                type: 'Select',
                name: field.name,
                label: field.caption,
                options: field.acceptedValues?.filter(i => i)
                                                .map((i: string | null) => ({
                                                    label: i!,
                                                    value: i!
                                                })) ?? [],
                required: field.required ?? false,
                defaultValue: field.defaultValue,
                converter: EmptyStringToNull
            })

        case "MultipleChoice":
            return ({
                type: 'TagsSelect',
                name: field.name,
                label: field.caption,
                options: field.acceptedValues?.filter(i => i)
                                                .map((i: string | null) => ({
                                                    label: i!,
                                                    value: i!
                                                })) ?? [],
                required: field.required ?? false,
                defaultValue: ArrayToJSON.compose(field.defaultValue),
            })
    }

    return ({
        type: field.type as FieldScalarTypes,
        name: field.name,
        label: field.caption,
        required: false,
        enabled: false
    })

}

export const useContentManagerFormSchema = (entitySchema?: GetEntityFirstLevelSchemaQuery) => {
    
    const formSchema = useMemo(() => {

        var parentGroup: dynamicLayoutItem<FormField> = {
            type: 'group',
            direction: 'vertical',
            gap: 1.5,
            key: '001',
            children: []
        };

        if (!entitySchema || !entitySchema.entity) {
            return parentGroup;
        }

        entitySchema.entity.fields!
            .filter(i => i.name != 'id') // skip id
            .filter(i => i.name != 'createdAt' && i.name != 'updatedAt') // TODO: skip createdAt, updateAt from form schema
            .forEach((item) => {
                const formField = getFieldByType(item);
                (parentGroup as dynamicLayoutItem_Group<FormField>).children.push({
                    data: {
                        ...formField,
                        tags: {
                            displayField: entitySchema?.entity?.displayField?.name
                        },
                     }
                });
            });


        entitySchema.entity.edges!
            .filter(i => i.name.startsWith('ref') == false) //TODO: ref fields will be removed from BE
            .filter(i => i.name != 'createdBy' && i.name != 'updatedBy') // skip createdBy, updatedBy from form schema
            .forEach((item) => {
            // add edges
            const newEdge: dynamicLayoutItem_Item<FormField> = {
                data: {
                    type: 'Relation',
                    name: item.name,
                    label: item.caption,
                    required: item.required ?? false,
                    entityName: item.relatedEntity.name,
                    converter: LookupToGraphQlFormat,
                    tags: {
                        displayField: entitySchema?.entity?.displayField?.name
                    },
                    ...((item.name == 'createdBy' || item.name == 'updatedBy') ? {
                        enabled: false,
                        visibleOnMode: [FormOpenMode.Edit]
                    } : {})
                }
            };
            (parentGroup as dynamicLayoutItem_Group<FormField>).children.push(newEdge);
        });

        return parentGroup;

    }, [entitySchema]);

    return formSchema;
}

useContentManagerFormSchema.displayName = 'useContentManagerFormSchema';