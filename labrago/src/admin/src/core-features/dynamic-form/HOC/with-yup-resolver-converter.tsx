import { pipe } from '@/core-features/dynamic-form/value-convertor';
import { Resolver, ResolverOptions } from 'react-hook-form';

export const withYupResolverConverter = (resolver: Resolver, schema: any) => {

    return async (data: any, context: any, options: ResolverOptions<{ [x: string]: any; }>) => {

        const result = await resolver(data, context, options);

        // Check if there are no validation errors
        if (result.errors && Object.keys(result.errors).length) {
            return result;
        }

        let resultWithConversions: {
            values: { [key: string]: any },
            errors: any
        } = {
            values: { ...result.values },
            errors: { ...result.errors },
        }

        options.names?.forEach((i) => {
            const meta: any = schema.fields[i]?.spec?.meta;
            if (!meta) {
                return;
            }

            if(meta.converter){
                const originalValue = resultWithConversions.values[i];
                const convertedValue = pipe(meta.converter, meta.tags)(originalValue);

                resultWithConversions.values[i] = convertedValue;
            }
        })

        return resultWithConversions;
    }
}