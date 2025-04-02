import dayjs from 'dayjs';
import { MutableRefObject, ReactNode, useMemo, useRef } from 'react';
import { FormFieldTypes } from '@/types/field-type-descriptor';
import { localeConfig } from "@/config/locale-config"
import CheckIcon from '@mui/icons-material/Check';
import { ColumnDef, useResponsivePin, useRowExpansionStore } from 'mosaic-data-table';
import { Edge, Field, RelationType } from '@/lib/apollo/graphql.entities';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { stringAvatar } from '@/lib/utils/avatar';

export type ColumnOptions = {
    hasSort?: boolean,
    width?: number,
}

interface UseDynamicGridColumnsProps {
    fields?: Field[],
    edges?: Edge[],
    displayFieldName?: string,
    expansionStore: ReturnType<typeof useRowExpansionStore>,
    showId: boolean
}
export const useDynamicGridColumns = ({
    fields = [],
    edges = [],
    displayFieldName,
    expansionStore,
    showId
}: UseDynamicGridColumnsProps): ColumnDef[] => {

    const displayFieldPin = useResponsivePin({ pin: 'left', breakpoint: 'sm', direction: 'up' });

    const expansionStoreRef = useRef(expansionStore);
    expansionStoreRef.current = expansionStore;

    return useMemo(() => (
        [
            ...fields
                .filter(i => showId ? true : i.name != 'id')
                .filter(i => !i.private) // TODO: this should be hidden from BE
                .filter(i => i.type != 'RichText') // TODO: set RichText based on configuration
                .filter(i => i.type != 'Json') // TODO: set JSON based on configuration
                .map(i => fieldToColumn(i))
                .map(i => i.id === displayFieldName ? {
                    ...i,
                    pin: displayFieldPin,
                    highlight: true
                } : i),
            ...edges.map(i => edgeToColumn(i, expansionStoreRef)),
        ]
    ), [displayFieldPin, showId, displayFieldName, fields, edges]);
}


const fieldToColumn = (field: Field): ColumnDef<Field> => {

    // Add avatar for name column
    if (field.name == 'name' && field.type == 'ShortText') {
        return shortTextColumnDef(field.name, field.caption, (row: any) => {
            const cellValue = row[field.name];
            const avatarProps = stringAvatar(cellValue);
            return (<Stack direction="row" gap={1} alignItems="center">
                <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem', ...avatarProps.sx }} >{avatarProps.children}</Avatar>
                {cellValue}
            </Stack>)
        }, {
            width: 180,
            hasSort: true
        });
    }

    switch (field.type as FormFieldTypes) {
        case 'ShortText': return shortTextColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'LongText': return longTextColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'RichText': return richTextColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'Integer': return integerColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'DateTime': return dateTimeColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'Date': return dateColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'Time': return timeColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        case 'Boolean': return booleanColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
        default: return shortTextColumnDef(field.name, field.caption, (row: any) => row[field.name], { hasSort: true });
    }
}

const edgeToColumn = (edge: Edge, expansionStore: MutableRefObject<ReturnType<typeof useRowExpansionStore>>): ColumnDef<Edge> => {

    switch (edge.relationType) {
        case RelationType.One:
        case RelationType.OneToOne:
        case RelationType.OneToMany:
            return oneColumnDef(edge, expansionStore);
        case RelationType.Many:
        case RelationType.ManyToOne:
        case RelationType.ManyToMany:
            return manyColumnDef(edge, expansionStore);
    }

    return {
        id: edge.name,
        header: '',
        cell: (row: any) => ''
    }
}

const shortTextColumnDef = (name: string, caption: string, render: (row: any) => ReactNode, options?: ColumnOptions): ColumnDef<any> => {

    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: options?.width ?? 180,
        hasSort: options?.hasSort ?? false
    };
}

const longTextColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: options?.width ?? 300,
        hasSort: options?.hasSort ?? false
    };
}

const richTextColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: options?.width ?? 300,
        hasSort: options?.hasSort ?? false
    };
}

const integerColumnDef = (name: string, caption: string, render: (row: any) => number, options?: ColumnOptions): ColumnDef<any> => {
    return {
        id: name,
        header: caption,
        cell: (row: any) => render(row),
        width: options?.width ?? 150,
        hasSort: options?.hasSort ?? false
    };
}

const dateTimeColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
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
        width: options?.width ?? 210,
        hasSort: options?.hasSort ?? false
    };
}

const dateColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
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
        width: options?.width ?? 120,
        hasSort: options?.hasSort ?? false
    };
}

const timeColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
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
        width: options?.width ?? 180,
        hasSort: options?.hasSort ?? false
    };
}

const booleanColumnDef = (name: string, caption: string, render: (row: any) => string, options?: ColumnOptions): ColumnDef<any> => {
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
        width: options?.width ?? 120,
        hasSort: options?.hasSort ?? false
    };
}

const oneColumnDef = (edge: Edge, expansionStore: MutableRefObject<ReturnType<typeof useRowExpansionStore>>, options?: ColumnOptions): ColumnDef<any> => {

    return {
        id: edge.name,
        header: edge.caption,
        cell: (row: any) => {
            const entityValue = row[edge.name];
            if (!entityValue) {
                return '';
            }

            const displayValue = entityValue[edge.relatedEntity.displayField.name];

            return <Button
                variant="text"
                sx={{
                    padding: 0
                }}
                onClick={() => {

                    const rowStatus = expansionStore.current.expansionState[row.id];
                    const isExpanded = rowStatus?.isOpen ?? false;
                    const shouldBeExpanded = isExpanded == false ? true : (rowStatus.params.entityName != edge.relatedEntity.name || rowStatus.params.entryId != entityValue.id);

                    expansionStore.current.setParams({
                        rowId: row.id,
                        params: {
                            entityName: edge.relatedEntity.name,
                            entryId: entityValue.id
                        },
                        openImmediately: shouldBeExpanded
                    })
                }}>
                <Typography
                    color="text.primary"
                    variant='body2'
                    sx={{ textDecoration: 'underline' }}>{displayValue}</Typography></Button>
        },
        width: options?.width ?? 180,
        hasSort: options?.hasSort ?? false
    };
}

const manyColumnDef = (edge: Edge, expansionStore: MutableRefObject<ReturnType<typeof useRowExpansionStore>>, options?: ColumnOptions): ColumnDef<any> => {
    return {
        id: edge.name,
        header: edge.caption,
        cell: (row: any) => <Typography color="text.secondary" sx={{textDecoration: 'underline', fontSize: '14px', opacity: .5}}>View</Typography>,
        width: options?.width ?? 180,
        hasSort: options?.hasSort ?? false
    };
}

