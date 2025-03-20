import yup from "../yup";
import { FormField } from "@/core-features/dynamic-form/form-field";

export function createYupSchema(accumulator: any, currentValue: FormField) {

    if (!currentValue) {
        return accumulator;
    }

    const { type: inputType, name, min, max, required } = currentValue;

    let yupValidator: yup.Schema = null!;

    switch (inputType) {
        case "ShortText":
        case "LongText":
        case "RichText":
            yupValidator = yup.string()
                            .transform((value) => {
                                if(value == ''){
                                    return null;
                                }
                                return value;
                            });
            break;

        case "Email":
            yupValidator = yup.string().email("Invalid e-mail");
            break;

        case "Json":
            yupValidator = yup.string()
            .test('is-valid-json', 'Invalid JSON', (value?: string) => {
                if(!value){
                    return true;
                }

                try {
                    JSON.parse(value);
                    return true;
                } catch (e) {
                    return false;
                }
            })
            break;

        case "Integer":
        case "Decimal":
        case "Float":
            yupValidator = yup.number()
                .transform((value) => Number.isNaN(value) ? null : value)
                .test('is-valid-min-range', 'Invalid Range', (value) => value == null || min == null || value >= min)
                .test('is-valid-max-range', 'Invalid Range', (value) => value == null || max == null || value <= max);
            break;

        case "DateTime":
        case "Date":
        case "Time":
            yupValidator = yup.mixed()
                .test('is-valid-date', 'Invalid Value', (value: any) => {
                    if(value == null){
                        return true;
                    }

                    return value?.isValid();
                })
                .test('is-valid-min-range', 'Invalid Range', (value) => value == null || min == null || value >= min)
                .test('is-valid-max-range', 'Invalid Range', (value) => value == null || max == null || value <= max);

            break;

        case "media":
            yupValidator = yup.object();
            break;

        case "Boolean":
        case "BooleanSelect":
            yupValidator = yup.boolean();
            break;

        default:
            yupValidator = yup.mixed();
    }

    yupValidator = yupValidator.nullable();

    if (required) {
        yupValidator = yupValidator.required('Required field');
    }

    // custom validators
    if(currentValue.validator){
        const validators = Array.isArray(currentValue.validator) ? currentValue.validator : [currentValue.validator];

        validators.forEach(i => {
            yupValidator = yupValidator.test(i.message, i.message, i.fnct);
        });
    }

    yupValidator = yupValidator.meta({
        type: currentValue.type,
        converter: currentValue.converter,
        tags: currentValue.tags
    })
    

    accumulator[name] = yupValidator;
    return accumulator;
}