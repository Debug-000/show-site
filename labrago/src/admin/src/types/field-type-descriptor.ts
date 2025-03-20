import { FC, ReactNode } from "react";

export type FieldScalarTypes = 'ID' | 'ShortText' | 'LongText' | 'Email' | 'RichText' | 'Integer' | 'Decimal' | 'Float' | 'DateTime' | 'Date' | 'Time' | 'media' | 'Boolean' | 'Json' | 'Enum' | 'SingleChoice' | 'MultipleChoice';
export type EdgeRelationTypes = 'Relation';
export type EntityChildTypes = FieldScalarTypes | EdgeRelationTypes;


export type ChildTypeDescriptor = {
    type: EntityChildTypes;
    icon: JSX.Element;
    label: string;
    description?: string;
    disabled?: boolean
}

export type FormFieldTypes = EntityChildTypes | 'Select' | 'TagsSelect' | 'BooleanSelect' | 'Autocomplete' | 'EntitySelector' ;