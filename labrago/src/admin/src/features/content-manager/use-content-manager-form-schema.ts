import { Edge, Entity, Field, RelationType } from "@/lib/apollo/graphql.entities";
import { FieldScalarTypes } from "@/types/field-type-descriptor";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useMemo } from "react";
import { ArrayToJSON, DateTimeToString, DateToString, EmptyStringToNull, LookupToGraphQlFormat, NumberToString, StringToJSON, TimeToString } from "@/core-features/dynamic-form/value-convertor";
import { dynamicLayoutItem, dynamicLayoutItem_Group, dynamicLayoutItem_Item } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { FullEntity } from "@/types/entity";

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

const getRelationByType = (edge: Edge, entitySchema?: {entity: Entity}): FormField => {
    switch (edge.relationType) {
        case RelationType.One:
        case RelationType.OneToOne:
        case RelationType.OneToMany:

            return {
                type: 'RelationOne',
                name: edge.name,
                label: edge.caption,
                required: edge.required ?? false,
                entityName: edge.relatedEntity.name,
                converter: LookupToGraphQlFormat,
            }

        case RelationType.Many:
        case RelationType.ManyToOne:
        case RelationType.ManyToMany:

            return {
                type: 'RelationMany',
                name: edge.name,
                label: edge.caption,
                required: edge.required ?? false,
                entityName: edge.relatedEntity.name,
                converter: LookupToGraphQlFormat,
            }
    }

    return ({
        type: 'ShortText',
        name: edge.name,
        label: edge.caption,
        required: false,
        enabled: false
    })
}

export const useContentManagerFormSchema = (entity: FullEntity | null) => {

    const formSchema = useMemo(() => {

        var parentGroup: dynamicLayoutItem<FormField> = {
            type: 'group',
            direction: 'vertical',
            gap: 1.5,
            key: '001',
            children: []
        };

        if (!entity) {
            return parentGroup;
        }

        entity.fields!
            .filter(i => i.name != 'id') // skip id
            .filter(i => i.name != 'createdAt' && i.name != 'updatedAt') // TODO: skip createdAt, updateAt from form schema
            .forEach((item) => {
                const formField = getFieldByType(item);
                (parentGroup as dynamicLayoutItem_Group<FormField>).children.push({
                    data: {
                        ...formField,
                        tags: {
                            displayField: entity?.displayField?.name
                        },
                    }
                });
            });


        entity.edges!
            .filter(i => i.name.startsWith('ref') == false) //TODO: ref fields will be removed from BE
            .filter(i => i.name != 'createdBy' && i.name != 'updatedBy') // skip createdBy, updatedBy from form schema
            .forEach((item) => {

                const formRelation = getRelationByType(item as Edge);

                // add edges
                const newEdge: dynamicLayoutItem_Item<FormField> = {
                    data: {
                        ...formRelation,
                        tags: {
                            displayField: entity?.displayField?.name
                        }
                    }
                };
                
                (parentGroup as dynamicLayoutItem_Group<FormField>).children.push(newEdge);
            });

        return parentGroup;

    }, [entity]);

    return formSchema;
}

useContentManagerFormSchema.displayName = 'useContentManagerFormSchema';