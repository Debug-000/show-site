"use client";

import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
//import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Button, IconButton, ListItemIcon, ListItemText, MenuItem, Stack, SvgIcon, Tooltip } from '@mui/material';
import { FilterDialog } from '../../core-features/dynamic-filter/filter-dialog';
import { FieldScalarTypes } from '@/types/field-type-descriptor';
import { AdvancedFilter as AdvancedFilter } from '@/core-features/dynamic-filter/filter';
import { useContentManagerFilterDialog } from './use-content-manager-filter-dialog';
import { MenuButton } from '@/shared/components/menu/menu-button';
import { MenuItemSelect } from '@/shared/components/menu/menu-item-select';
import { BulkActionsMenu } from '@/shared/components/bulk-actions-menu';
import { QueryField } from '@/shared/components/query-field';
import { FilterEditor } from '@/shared/components/filter-editor';
import { ColumnDef } from 'mosaic-data-table';
import { useContentManagerSearchFromQuery } from '@/hooks/use-content-manager-search-from-query';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WrenchScrewdriverIcon from '@heroicons/react/24/outline/WrenchScrewdriverIcon';

export type SearchField = {
    label: string;
    name: string;
    type: FieldScalarTypes;
    selectOptions?: string[];
}

interface OrdersSearchProps {
    //fields: SearchField[];
    headCells?: ColumnDef[];
    disabled?: boolean;
    onRefresh?: () => void;
    filters?: AdvancedFilter[];
    onFiltersApply?: (filters: AdvancedFilter[]) => void;
    onFiltersClear?: () => void;
    onQueryChange?: (query: string) => void;
    query?: string;
    selected?: string[];
    onBulkDelete?: () => void;

    selectionEnabled: boolean;
    onSelectionEnabledChange?: (enabled: boolean) => void;

    filterEnabled: boolean;
    onFilterEnabledChange?: (enabled: boolean) => void;
}
export const ContentManagerSearch: FC<OrdersSearchProps> = (props) => {

    const {
        //fields = [], 
        headCells, disabled = false, filters = [], onFiltersApply, onFiltersClear, onQueryChange, query = '', selected = [], onBulkDelete } = props;
    //const filterDialog = useContentManagerFilterDialog({ fields });
    const contentManagerSearch = useContentManagerSearchFromQuery();

    // const handleFiltersApply = useCallback((filters: AdvancedFilter[]) => {
    //     filterDialog.dialog.handleClose();
    //     onFiltersApply?.(filters);
    // }, [filterDialog, onFiltersApply]);

    // const handleFiltersClear = useCallback((): void => {
    //     filterDialog.dialog.handleClose();
    //     onFiltersClear?.();
    // }, [filterDialog, onFiltersClear]);

    const hasSelection = selected.length > 0;
    const hasFilters = filters.length > 0;

    return (
        <>
            <div>
                <Stack gap={2}>

                    <Stack
                        alignItems="center"
                        direction="row"
                        flexWrap="wrap"
                        gap={2}
                    >
                        {hasSelection && (
                            <BulkActionsMenu
                                disabled={disabled}
                                selectedCount={selected.length}
                                onDelete={onBulkDelete}
                            />
                        )}

                        <Tooltip title="Refresh" placement='bottom' arrow>
                            <IconButton
                                color="primary"
                                onClick={() => props.onRefresh?.()}
                                size="medium">
                                <CachedIcon />
                            </IconButton>
                        </Tooltip>

                        <QueryField
                            disabled={disabled}
                            placeholder="Search..."
                            onChange={onQueryChange}
                            sx={{
                                flexGrow: 1,
                            }}
                            value={query}
                        />

                        <Button
                            disabled={disabled}
                            onClick={() => props.onSelectionEnabledChange?.(!props.selectionEnabled)}
                            size="medium"
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <ChecklistIcon />
                                </SvgIcon>
                            )}
                            variant={props.selectionEnabled ? 'contained' : 'text'}
                            aria-haspopup="dialog"
                        >
                            Selection
                        </Button>

                        <Button
                            disabled={disabled}
                            onClick={() => {
                                var newValue = !props.filterEnabled;
                                props.onFilterEnabledChange?.(newValue);
                                if (!newValue) {
                                    contentManagerSearch.handleFiltersApply({});
                                }
                            }}
                            size="medium"
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <FilterAltIcon />
                                </SvgIcon>
                            )}
                            variant={props.filterEnabled ? 'contained' : 'text'}
                            aria-haspopup="dialog"
                        >
                            Filter
                        </Button>

                        <MenuButton
                            text="Configure"
                            slotProps={{
                                buttonProps: { 
                                    startIcon:(
                                        <SvgIcon style={{ fontSize: 18 }} >
                                            <WrenchScrewdriverIcon />
                                        </SvgIcon>)
                                    
                                 }
                            }}>

                            <MenuItem>
                                <ListItemText>Rows per page</ListItemText>
                                <MenuItemSelect<number>
                                    value={contentManagerSearch.state.rowsPerPage}
                                    valueChange={(value) => { contentManagerSearch.handleRowsPerPageChange(value) }}
                                    options={[
                                        { label: '10', value: 10 },
                                        { label: '50', value: 50 },
                                        { label: '100', value: 100 }]}
                                />
                            </MenuItem>


                        </MenuButton>

                    </Stack>

                    {!!Object.keys(contentManagerSearch.state.filter).length && (<FilterEditor filter={contentManagerSearch.state.filter} onChange={contentManagerSearch.handleFiltersApply} headCells={headCells} />)}
                </Stack>
            </div>
            {/* <FilterDialog
                filters={filters}
                onApply={handleFiltersApply}
                onClear={handleFiltersClear}
                onClose={filterDialog.dialog.handleClose}
                open={filterDialog.dialog.open}
                properties={filterDialog.filterProperties}
            /> */}
        </>
    );
};

ContentManagerSearch.propTypes = {
    disabled: PropTypes.bool,
    filters: PropTypes.array,
    onFiltersApply: PropTypes.func,
    onFiltersClear: PropTypes.func,
    onQueryChange: PropTypes.func,
    query: PropTypes.string,
    selected: PropTypes.array
};
