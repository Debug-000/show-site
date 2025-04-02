import { useContentManagerSearch } from "@/hooks/use-content-manager-search";
import { useContentManagerStore } from "@/hooks/use-content-manager-store";
import { useDynamicGridColumns } from "@/hooks/use-dynamic-grid-columns";
import { useFullEntity } from "@/hooks/use-entities";
import { AbsoluteHeightContainer, Action, ColumnsFillRowSpacePlugin, CustomBodyCellContentRenderPlugin, Filter, FilterRowPlugin, HighlightColumnPlugin, MosaicDataTable, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowExpansionPlugin, useGridPlugins, usePluginWithParams, useRowExpansionStore } from "mosaic-data-table";
import { eqStringFoldOperator } from "../dynamic-filter/filter-operators";
import { useContentManagerIds } from "@/features/content-manager/use-content-manger-ids";
import { useCallback } from "react";
import { Box, ListItemIcon, MenuItem, Stack, styled } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useRouter } from "next/navigation";

interface OneItemViewerGridProps {
    entityName: string;
    entryId: string;
    showId: boolean;
}
export const OneItemViewerGrid = (props: OneItemViewerGridProps) => {

    const { push } = useRouter();
    const contentManagerSearch = useContentManagerSearch(props.entityName, { initialFilter: { 'id': { operator: eqStringFoldOperator.name, value: props.entryId } } });
    const fullEntity = useFullEntity({ entityName: props.entityName });
    const contentManagerStore = useContentManagerStore({ entityName: props.entityName, fullEntity: fullEntity, searchState: contentManagerSearch.state, });

    const expansionStore = useRowExpansionStore();

    const headCells = useDynamicGridColumns({
        fields: contentManagerStore.state.entityFields,
        edges: contentManagerStore.state.entityEdges,
        displayFieldName: fullEntity?.displayField?.name ?? 'id',
        expansionStore: expansionStore,
        showId: props.showId
    });

    // Row Actions
    const actions: Action<unknown>[] = [
        {
            id: 'goto',
            render: (field: unknown) => (<MenuItem id='edit-menu-item' key={`edit-${field}`} onClick={() => gotoEntry(field)}>
                <ListItemIcon>
                    <DirectionsRunIcon />
                </ListItemIcon>
                Go To Entry
            </MenuItem>)
        },
    ];

    const gotoEntry = useCallback((entry: any) => {
        const path = `/content-manager/${props.entityName}`;

        const filter: Filter = {
            "id": {
                operator: eqStringFoldOperator.name,
                value: entry.id
            }
        }

        const withFilters = `${path}?f=${JSON.stringify(filter)}`;
        push(withFilters);
    }, []);

    const gridPlugins = useGridPlugins(
        CustomBodyCellContentRenderPlugin,
        usePluginWithParams(PaddingPluggin, {}),
        ColumnsFillRowSpacePlugin,
        usePluginWithParams(HighlightColumnPlugin, {}),

        usePluginWithParams(RowActionsPlugin, {
            actions: actions
        }),
        PinnedColumnsPlugin
    )

    const childGridParams = Object.entries(expansionStore.expansionState)?.[0]?.[1];

    return (
        <Stack gap={0}>

            <Box sx={{
                backgroundColor: 'var(--mui-palette-background-paper)',
                borderRadius: 2,
                marginTop: '10px',
                position: 'relative',
                //transform: 'rotate(-1deg)',
            }}>
                <ArrowRoot />
                <Box sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                }}>
                <MosaicDataTable
                    plugins={gridPlugins}
                    caption={`${props.entityName} Entry Viewer`}
                    items={contentManagerStore.state.data}
                    headCells={headCells}
                />
                </Box>
                
            </Box>

            {childGridParams?.isOpen && <OneItemViewerGrid
                key={`${childGridParams.params.entityName}${childGridParams.params.entryId}`}
                entityName={childGridParams.params.entityName}
                entryId={childGridParams.params.entryId}
                showId={props.showId} />}

        </Stack>)
}


interface OneItemViewerGridRootProps {
    entityName: string;
    entryId: string;
    showId: boolean;
}
export const OneItemViewerGridRoot = (props: OneItemViewerGridRootProps) => {

    return (

        <Box sx={{
            paddingBottom: '10px',
            paddingX: '10px',
            backgroundImage: 'url(/rough-diagonal.png)',
        }}>
            <OneItemViewerGrid
                key={`${props.entityName}${props.entryId}`}
                entityName={props.entityName}
                entryId={props.entryId}
                showId={props.showId} />
        </Box>
    )
}


const ArrowRoot = styled('div')(({

    position: 'absolute',
    top: '-9px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid var(--mui-palette-background-paper)',
}
));
