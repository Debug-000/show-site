import { Button, DialogContent, IconButton, Stack } from "@mui/material";
import { SvgIcon } from "@mui/material";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo } from "react";
import { FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { DynamicLayoutFormFields } from "../../core-features/dynamic-form/dynamic-layout-form";
import EntityFieldTypeDescriptor from "./entity-field-type-descriptor";
import { ChildTypeDescriptor } from "@/types/field-type-descriptor";
import { ChainDialogContext } from "../../core-features/dynamic-dialog/src/dynamic-dialog";
import { ChainDialogContentRef } from "@/core-features/dynamic-dialog/src/dynamic-dialog-types";
import { EntityTypeDesignerEntryDialogContent } from "./entity-type-designer-new-field-type-dialog";
import { useEntityTypeDesignerNewFieldSchema } from "./use-entity-type-designer-new-field-schema";
import { useUpdateValueBasedOnDependencies } from "./useUpdateValueBasedOnDependencies";
import { Id } from "@/shared/components/id";
import { DesignerField } from "@/types/entity";
import { useMyDialogContext } from "@/core-features/dynamic-dialog/src/use-my-dialog-context";
import { DynamicDialogFooter } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-footer";
import { DynamicDialogHeader } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-header";


interface EntityTypeDesignerNewFieldPropsDialogProps {
    selectedChildTypeDescriptor: ChildTypeDescriptor;
    defaultValue: DesignerField;
}
export const EntityTypeDesignerNewFieldPropsDialog = forwardRef<ChainDialogContentRef, EntityTypeDesignerNewFieldPropsDialogProps>((props, ref) => {

    const { selectedChildTypeDescriptor, defaultValue } = props;
    const myDialogContext = useMyDialogContext();

    const dynamicForm = useDynamicForm({ initialOpenMode: myDialogContext.openMode, defaultValue });
    const schema = useEntityTypeDesignerNewFieldSchema(selectedChildTypeDescriptor, dynamicForm.watch, myDialogContext.editId);
    useUpdateValueBasedOnDependencies({ setValue: dynamicForm.setValue, watch: dynamicForm.watch });

    useEffect(() => {
        dynamicForm.setLayoutItems(schema);
    }, [dynamicForm.setLayoutItems, schema]);

    const onSetResult = useCallback(
        (data: any) => {
            myDialogContext.closeWithResults({
                selectedChildTypeDescriptor: selectedChildTypeDescriptor,
                field: {
                    ...data,
                    __typename: "Field",
                    type: selectedChildTypeDescriptor.type,
                },
            });
        },
        [myDialogContext.closeWithResults],
    );

    const onSetResultAndAddAnother = useCallback(
        (data: any) => {
            onSetResult(data);
            myDialogContext.addPopupAsFirst(EntityTypeDesignerEntryDialogContent, {}, myDialogContext.openMode);
        },
        [onSetResult, myDialogContext.addPopupAsFirst],
    );

    const goToFieldType = useCallback(() => {
        myDialogContext.addPopupAsFirst(EntityTypeDesignerEntryDialogContent, {}, myDialogContext.openMode);
    }, [myDialogContext.addPopupAsFirst]);



    useImperativeHandle(ref, () => ({
        enterPressed: (e: React.KeyboardEvent<HTMLDivElement>) => {
            dynamicForm.handleSubmit(onSetResult)(e);
        }
    }));

    return (
        <>
            <DynamicDialogHeader>
                <Stack direction="row" gap={1}>
                    {myDialogContext.openMode === FormOpenMode.New && (
                        <IconButton onClick={goToFieldType}>
                            <SvgIcon fontSize="small">
                                <ArrowLeftIcon />
                            </SvgIcon>
                        </IconButton>
                    )}

                    {selectedChildTypeDescriptor && (
                        <EntityFieldTypeDescriptor
                            icon={selectedChildTypeDescriptor.icon}
                            label={selectedChildTypeDescriptor.label}
                        ></EntityFieldTypeDescriptor>
                    )}
                </Stack>
            </DynamicDialogHeader>

            <DialogContent>

                {!!defaultValue?.name && <Id id="Name" value={defaultValue.name} rootProps={{
                    marginLeft: 'auto',
                }} />}

                <form onSubmit={(e) => e.preventDefault()}  >
                    <DynamicLayoutFormFields dynamicForm={dynamicForm} />
                </form>

            </DialogContent>

            <DynamicDialogFooter>
                <Stack direction="row" gap={1}>
                    {myDialogContext.openMode === FormOpenMode.New && (
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={dynamicForm.handleSubmit(onSetResultAndAddAnother)}
                        >
                            Save and Add Another Field
                        </Button>
                    )}

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={dynamicForm.handleSubmit(onSetResult)}>
                        Save
                    </Button>
                </Stack>
            </DynamicDialogFooter>
        </>
    );
});
EntityTypeDesignerNewFieldPropsDialog.displayName = 'EntityTypeDesignerNewFieldPropsDialog';