import { Button, ButtonGroup, DialogContent, Menu, MenuItem, Stack } from "@mui/material";
import { Grid } from '@mui/material';
import { forwardRef, useCallback, useContext, useImperativeHandle, useRef, useState } from "react";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import EntityFieldType from "./entity-field-type-descriptor";
import { DesignerFieldGroup, designerEdgesGroups, designerFieldsGroups } from "./designer-fields-groups";
import { EntityTypeDesignerNewFieldPropsDialog } from "./entity-type-designer-new-field-props-dialog";
import { FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { ChildTypeDescriptor, EntityChildTypes } from "@/types/field-type-descriptor";
import { EntityTypeDesignerNewEdgePropsDialog } from "./entity-type-designer-new-edge-props-dialog";
import { useDynamicDialog } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog";
import { designerEdgeMap, designerFieldsMap } from "./designer-field-map";
import { ChainDialogContentRef } from "@/core-features/dynamic-dialog/src/dynamic-dialog-types";
import { DesignerEdge, DesignerField } from "@/types/entity";
import { useMyDialogContext } from "@/core-features/dynamic-dialog/src/use-my-dialog-context";
import { useDynamicDialogHeader } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-header";

export const useEntityTypeDesignerEntryDialog = () => {

    const entityChildrenDynamicDialog = useDynamicDialog();

    const openAddNewChild = useCallback(() => {
        entityChildrenDynamicDialog.addPopup(
            EntityTypeDesignerEntryDialogContent,
            {},
            FormOpenMode.New,
        );
    }, [entityChildrenDynamicDialog.ref]);

    const editField = useCallback((field: DesignerField) => {

        const selectedChildTypeDescriptor = designerFieldsMap[field.type as EntityChildTypes];

        entityChildrenDynamicDialog.addPopup(
            EntityTypeDesignerNewFieldPropsDialog,
            {
                selectedChildTypeDescriptor,
                defaultValue: field,
            },
            FormOpenMode.Edit,
            field.name
        );

    }, []);
    
    const editEdge = useCallback((field: DesignerEdge) => {
        entityChildrenDynamicDialog.addPopup(
            EntityTypeDesignerNewEdgePropsDialog,
            {
                selectedChildTypeDescriptor: designerEdgeMap.Relation,
                defaultValue: field,
            },
            FormOpenMode.Edit,
            field.name
        );
    }, []);

    const openEditChild = useCallback((field: DesignerField | DesignerEdge) => {
        if (field.__typename === "Field") {
            editField(field);
        } else if (field.__typename === "Edge") {
           editEdge(field);
        }
    }, [entityChildrenDynamicDialog.ref]);

    return {
        ref: entityChildrenDynamicDialog.ref,
        openAddNewChild,
        openEditChild
    }
}

export const EntityTypeDesignerEntryDialogContent = forwardRef<ChainDialogContentRef>((props, ref) => {

    const myDialogContext = useMyDialogContext();
    const Header = useDynamicDialogHeader();
    
    useImperativeHandle(ref, () => ({

    }));

    const onFieldTypeSelected = useCallback((selectedChildTypeDescriptor: ChildTypeDescriptor) => {
        myDialogContext.addPopupAsFirst(EntityTypeDesignerNewFieldPropsDialog, {
            selectedChildTypeDescriptor,
        }, FormOpenMode.New);
    }, [myDialogContext.addPopupAsFirst]);

    const onEdgeTypeSelected = useCallback((selectedChildTypeDescriptor: ChildTypeDescriptor) => {
        myDialogContext.addPopupAsFirst(EntityTypeDesignerNewEdgePropsDialog, {
            selectedChildTypeDescriptor,
        }, FormOpenMode.New);
    }, [myDialogContext.addPopupAsFirst]);

    return (<>

        <Header>
            Select Field Type
        </Header>

        <DialogContent>
            
            <Stack gap={2}>
                <Grid container spacing={1}>

                    {/* FIELDS */}
                    {designerFieldsGroups.map(field => <Grid key={field.main.type} item xs={12} md={6}>

                        <EntityFieldWrapper 
                            entityFieldOptions={field}
                            fieldTypeSelected={onFieldTypeSelected}
                        ></EntityFieldWrapper>
                    </Grid>
                    )}
                </Grid>
                <Grid container spacing={1}>

                    {/* EDGES */}
                    {designerEdgesGroups.map(edge => <Grid key={edge.main.type} item xs={12} md={6}>
                        <EntityFieldWrapper
                            entityFieldOptions={edge}
                            fieldTypeSelected={onEdgeTypeSelected}
                        ></EntityFieldWrapper>
                    </Grid>
                    )}
                </Grid>
            </Stack>

        </DialogContent>
    </>);
});
EntityTypeDesignerEntryDialogContent.displayName = 'EntityTypeDesignerEntryDialogContent';

interface EntityFieldWrapperProps {
    entityFieldOptions: DesignerFieldGroup;
    fieldTypeSelected: (entityField: ChildTypeDescriptor) => void;
}
function EntityFieldWrapper(props: EntityFieldWrapperProps) {

    const { entityFieldOptions, fieldTypeSelected } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <ButtonGroup
                fullWidth
                aria-label="Button group with a nested menu"
            >
                <Button
                    // ADD HERE //
                    fullWidth
                    variant="outlined"
                    onClick={() => fieldTypeSelected(entityFieldOptions.main)}
                    sx={{
                        margin: 0,
                        paddingY: 0,
                        paddingX: 1
                    }}
                    disabled={!!entityFieldOptions.main.disabled}>
                    <EntityFieldType {...entityFieldOptions.main} ></EntityFieldType>
                </Button>

                {!!entityFieldOptions.children && <Button

                    ref={anchorRef}
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    sx={{
                        width: '30px'
                    }}
                    disabled={!!entityFieldOptions.main.disabled}
                >
                    <ArrowDropDownIcon />
                </Button>

                }

            </ButtonGroup>

            <Menu
                anchorEl={anchorRef.current}
                open={open}
                onClose={() => handleClose()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >

                {entityFieldOptions.children?.map((option: ChildTypeDescriptor) => (
                    <MenuItem
                        key={option.label}
                        onClick={(e) => {
                            fieldTypeSelected(option);
                            handleClose();
                        }}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
useEntityTypeDesignerEntryDialog.displayName = 'useEntityTypeDesignerEntryDialog';