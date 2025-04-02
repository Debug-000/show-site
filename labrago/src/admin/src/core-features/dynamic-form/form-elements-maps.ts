import { BooleanFormField } from "@/core-features/dynamic-form/form-fields/BooleanField";
import React, { ReactNode } from "react";
import { NumberFormField } from "@/core-features/dynamic-form/form-fields/NumberField";
import { TextShortFormField } from "@/core-features/dynamic-form/form-fields/TextShortField";
import { EmailFormField } from "@/core-features/dynamic-form/form-fields/EmailShortField";
import { DateTimeFormField } from "@/core-features/dynamic-form/form-fields/DateTimeField";
import { TimeFormField } from "@/core-features/dynamic-form/form-fields/TimeField";
import { TextLongFormField } from "@/core-features/dynamic-form/form-fields/TextLongField";
import { RichTextFormField } from "@/core-features/dynamic-form/form-fields/RichTextField";
import { DateFormField } from "@/core-features/dynamic-form/form-fields/DateField";
import { JSONFormField } from "@/core-features/dynamic-form/form-fields/JSONField";
import { SelectFormField } from "@/core-features/dynamic-form/form-fields/SelectField";
import { FormFieldTypes } from "@/types/field-type-descriptor";
import { LookupOneFIELDFormField } from "@/core-features/dynamic-form/form-fields/LookupOneFIELD";
import { LookupManyFIELDFormField } from "./form-fields/LookupManyFIELD";
import { EntitySelectorFIELDFormField } from "@/core-features/dynamic-form/form-fields/EntitySelectorFIELD";
import { BooleanSelectFormField } from "@/core-features/dynamic-form/form-fields/BooleanSelectField";
import { SingleChoiceFormField } from "@/core-features/dynamic-form/form-fields/SingleChoice";
import { MultipleChoiceFormField } from "@/core-features/dynamic-form/form-fields/MultipleChoice";
import { TagsSelectFormField } from "@/core-features/dynamic-form/form-fields/TagsSelectField";
import { PasswordFormField } from "./form-fields/PasswordField";

export const FormElementsMap = { 
    ShortText: TextShortFormField,
    LongText: TextLongFormField,
    Email: EmailFormField,
    RichText: RichTextFormField,
    Password: PasswordFormField,
    
    Integer: NumberFormField,
    Decimal: NumberFormField,
    Float: NumberFormField,

    Boolean: BooleanFormField,
    BooleanSelect: BooleanSelectFormField,

    DateTime: DateTimeFormField,
    Date: DateFormField,
    Time: TimeFormField,

    Json: JSONFormField,

    Select: SelectFormField,
    TagsSelect: TagsSelectFormField,

    SingleChoice: SingleChoiceFormField,
    MultipleChoice: MultipleChoiceFormField,
    RelationOne: LookupOneFIELDFormField,
    RelationMany: LookupManyFIELDFormField, 
    EntitySelector: EntitySelectorFIELDFormField

} as {[key in FormFieldTypes]: React.FC<any>};