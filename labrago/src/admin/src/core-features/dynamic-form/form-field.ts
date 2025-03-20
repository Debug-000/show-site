import { FormFieldTypes } from "../../types/field-type-descriptor";
import { ValueConverter } from "./value-convertor";

type BaseFormField<T extends FormFieldTypes = FormFieldTypes> = {
    name: string;
    type: T;
    label: string;
    required?: boolean,
    placeholder?: string;
    help?: string;

    min?: any;
    max?: any;

    enabled?: boolean;
    enableOnMode?: Array<FormOpenMode>;

    visible?: boolean;
    visibleOnMode?: Array<FormOpenMode>;

    defaultValue?: any;

    converter?: ValueConverter | ValueConverter[];
    validator?: Validator | Validator[];

    tags?: Record<string, any>;
}

type SelectField = BaseFormField<'Select'> & { options: Options };
type TagsSelectField = BaseFormField<'TagsSelect'> & { options: Options };
type SingleChoiceField = BaseFormField<'SingleChoice'> & { options: Options };
type MultipleChoiceField = BaseFormField<'MultipleChoice'> & { options: Options };
type RelationField = BaseFormField<'Relation'> & { entityName: string };

export type FormField = 
  | BaseFormField
  | SelectField
  | TagsSelectField
  | SingleChoiceField
  | MultipleChoiceField
  | RelationField;

export type PrimitiveOption<T = string | number | boolean | null> = {
    label: string;
    value: T;
};

export type ObjectOption<T> = {
    label: string;
    value: T;
};

export type OptionWithSetting <T>= {
    options: Array<ObjectOption<T>>,
    valueProp: string;
}

export type Options = PrimitiveOption[] | OptionWithSetting<Record<string, any>>;

export enum FormOpenMode {
    New = 1,
    Edit = 2,
    View = 3
}

export type Validator = {
    message: string;
    fnct: (value: any) => boolean;
}