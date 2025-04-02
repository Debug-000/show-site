import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { DynamicLayoutFormFields } from "../../core-features/dynamic-form/dynamic-layout-form";
import { ChainDialogContentRef } from "@/core-features/dynamic-dialog/src/dynamic-dialog-types";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { ChangedNameCaptionEntity } from "@/types/entity";
import { useEntitiesDesignerSystemValidation } from "./use-designer-system-validation";
import { Id } from "@/shared/components/id";
import { useMyDialogContext } from "@/core-features/dynamic-dialog/src/use-my-dialog-context";
import Avvvatars from "avvvatars-react";
import { DynamicDialogHeader } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-header";
import { DynamicDialogFooter } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-footer";


interface EntityTypeNewEntityDialogProps {
    defaultValue: ChangedNameCaptionEntity;
}
export const EntityTypeNewEntityDialog = forwardRef<ChainDialogContentRef, EntityTypeNewEntityDialogProps>((props, ref) => {

    const { defaultValue } = props;
    const myDialogContext = useMyDialogContext();
    const systemValidation = useEntitiesDesignerSystemValidation();

    const formItems: dynamicLayoutItem<FormField> = useMemo(() => ({
        type: 'group',
        direction: 'vertical',
        gap: 1.5,
        children: [
            {
                data: {
                    type: 'ShortText',
                    name: 'caption',
                    label: 'Display Name',
                    required: true,
                    validator: [{
                        message: "Entity already exists",
                        fnct: (value: any) => {
                            return systemValidation.validationEntityCaptionExists(value, myDialogContext.editId) == false;
                        }
                    }, {
                        message: "System reserved keyword",
                        fnct: (value: any) => {
                            return systemValidation.validationChildCaptionKeyword(value) == false;
                        }
                    }, {
                        message: "Caption must start with a letter",
                        fnct: (value: any) => {
                            return systemValidation.validationStartsWithLetter(value) == false;
                        }
                    }, {
                        message: "Caption must be singular",
                        fnct: (value: any) => {
                            return systemValidation.validationCaptionIsSingular(value) == false;
                        }
                    }]
                }
            }]
    }), [myDialogContext.editId, systemValidation]);

    const dynamicForm = useDynamicForm({ initialOpenMode: FormOpenMode.New, initialLayout: formItems, defaultValue });

    const name = useMemo(() => {
        return defaultValue?.name;
    }, [defaultValue]);

    const onFinish = useCallback((data: any) => {
        myDialogContext.closeWithResults({ ...data });
    }, [myDialogContext.closeWithResults]);

    useImperativeHandle(ref, () => ({
        enterPressed: () => {
            dynamicForm.handleSubmit(onFinish)();
        }
    }));

    return (<>

        <DynamicDialogHeader whatsThis="An entity represents a distinct piece of content or data within the CMS.
                It can be anything from a blog post, product, user profile, or any other type of data you need to manage.
                Entities help organize and structure your content efficiently.">
            {myDialogContext.openMode == FormOpenMode.New ? 'New Entity' : 'Edit Entity'}
        </DynamicDialogHeader>

        <DialogContent sx={{ overflow: 'visible' }}>

            <Stack direction="row" justifyContent="center" sx={{
                width: 'fit-content',
                margin: 'auto',
                padding: '5px',
                border: '2px dashed color-mix(in srgb, var(--mui-palette-background-paper), var(--mui-palette-common-onBackground) 20%)',
                borderRadius: '100%'
            }}>
                <Avvvatars value={dynamicForm.watch('caption') ?? 'Unknown'} style="shape" size={65} />
            </Stack>

            {!!name && <Id id="Name" value={name} rootProps={{
                marginLeft: 'auto',
            }} />}

            <form onSubmit={(e) => e.preventDefault()} >
                <DynamicLayoutFormFields dynamicForm={dynamicForm} />
            </form>
        </DialogContent>
        <DynamicDialogFooter>
            <Button
                color="primary"
                variant="contained"
                onClick={dynamicForm.handleSubmit(onFinish)}
            >Save</Button>
        </DynamicDialogFooter>
    </>)
});
EntityTypeNewEntityDialog.displayName = 'EntityTypeNewEntityDialog';