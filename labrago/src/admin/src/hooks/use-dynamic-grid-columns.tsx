import dayjs from 'dayjs';
import { useMemo } from 'react';
import { FormFieldTypes } from '@/types/field-type-descriptor';
import { localeConfig } from "@/config/locale-config"
import CheckIcon from '@mui/icons-material/Check';
import { ColumnDef, useResponsivePin, useRowExpansionStore } from 'mosaic-data-table';
import { Edge, Field } from '@/lib/apollo/graphql';
import { Button, Typography } from '@mui/material';

interface UseDynamicGridColumnsProps {
    fields?: Field[],
    edges?: Edge[],
    displayFieldName?: string,
    expansionStore: ReturnType<typeof useRowExpansionStore>
}
export const useDynamicGridColumns = ({
    fields = [],
    edges = [],
    displayFieldName,
    expansionStore
}: UseDynamicGridColumnsProps): ColumnDef[] => {

    const displayFieldPin = useResponsivePin({ pin: 'left', breakpoint: 'sm', direction: 'up' });

    return useMemo(() => (
        [
            ...fieldsToColumns(fields).map(i => i.id === displayFieldName ? {
                ...i,
                pin: displayFieldPin,
                highlight: true
            } : i),
            ...edgesToColumns(edges, expansionStore),
        ]
    ), [displayFieldPin, displayFieldName, fields, edges, expansionStore]);
}

const shortTextColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {

    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: 150,
        hasSort: hasSort
    };
}

const longTextColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: 300,
        hasSort: hasSort
    };
}

const richTextColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: 300,
        hasSort: hasSort
    };
}

const integerColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => number): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: 150,
        hasSort: hasSort
    };
}

const dateTimeColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => {

            const value = render(row);
            if (!value) {
                return '';
            }

            return dayjs(value).format(localeConfig.dateTime.displayFormat);

        },
        width: 210,
        hasSort: hasSort
    };
}

const dateColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => {

            const value = render(row);
            if (!value) {
                return '';
            }

            return dayjs(value).format(localeConfig.date.displayFormat);

        },
        width: 120,
        hasSort: hasSort
    };
}

const timeColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => {

            const value = render(row);
            if (!value) {
                return '';
            }

            return dayjs(value).format(localeConfig.time.displayFormat);

        },
        width: 180,
        hasSort: hasSort
    };
}

const booleanColumnDef = (name: string, caption: string, hasSort: boolean, render: (row: any) => string): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => {

            const value = render(row);
            if (!value) {
                return '';
            }

            return (<CheckIcon />)

        },
        width: 120,
        hasSort: hasSort
    };
}

const fieldToColumn = (field: Field): ColumnDef<Field> => {

    switch (field.type as FormFieldTypes) {
        case 'ShortText': return shortTextColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'LongText': return longTextColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'RichText': return richTextColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'Integer': return integerColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'DateTime': return dateTimeColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'Date': return dateColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'Time': return timeColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        case 'Boolean': return booleanColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
        default: return shortTextColumnDef(field.name, field.caption, true, (row: any) => row[field.name]);
    }
}

const edgeToColumn = (edge: Edge, expansionStore: ReturnType<typeof useRowExpansionStore>): ColumnDef<Edge> => {

    return shortTextColumnDef(edge.name, edge.caption, false, (row: any) => {
        const entityValue = row[edge.name];
        if (!entityValue) {
            return '';
        }


        return <Button
            variant="text"
            sx={{
                padding: 0
            }}
            onClick={() => {

                const rowStatus = expansionStore.expansionState[row.id];
                const isExpanded = rowStatus?.isOpen ?? false;
                const shouldBeExpanded = isExpanded == false ? true : (rowStatus.params.entityName != edge.relatedEntity.name || rowStatus.params.entryId != entityValue.id);

                expansionStore.setParams({
                    rowId: row.id,
                    params: {
                        entityName: edge.relatedEntity.name,
                        entryId: entityValue.id
                    },
                    openImmediately: shouldBeExpanded
                })
            }
            }
        ><Typography
            color="text.primary"
            variant='body2'
            sx={{ textDecoration: 'underline' }}>{entityValue.name}</Typography></Button>

        return entityValue.name;
    });
}

const fieldsToColumns = (fields: Field[]): ColumnDef<Field>[] => {
    return fields
        .filter(i => i.name != 'id') // TODO: set id based on configuration
        .filter(i => i.type != 'RichText') // TODO: set RichText based on configuration
        .filter(i => i.type != 'Json') // TODO: set JSON based on configuration
        .map(i => fieldToColumn(i));
}

const edgesToColumns = (edge: Edge[], expansionStore: ReturnType<typeof useRowExpansionStore>): ColumnDef<Edge>[] => {
    return edge.map(i => edgeToColumn(i, expansionStore));
}