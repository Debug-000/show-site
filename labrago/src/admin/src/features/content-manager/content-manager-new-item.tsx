import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from "react";
import { DynamicLayoutFormFields } from "../../core-features/dynamic-form/dynamic-layout-form";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { ChainDialogContentRef } from "@/core-features/dynamic-dialog/src/dynamic-dialog-types";
import { useGetEntityFirstLevelSchemaQuery } from "@/lib/apollo/graphql";
import { useEntities } from "@/hooks/use-entities";
import { useContentManagerFormSchema } from "./use-content-manager-form-schema";
import { Id } from "@/shared/components/id";
import { HistoryEvent, HistoryTimeLine } from "@/shared/components/history-timeline";
import AvatarUserDetails from "@/shared/components/avatar-user-details";
import { FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { localeConfig } from "@/config/locale-config";
import dayjs from 'dayjs';
import { useMyDialogContext } from "@/core-features/dynamic-dialog/src/use-my-dialog-context";
import { useDynamicDialogHeader } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-header";
import { useDynamicDialogFooter } from "@/core-features/dynamic-dialog/src/use-dynamic-dialog-footer";

interface ContentManagerEntryDialogContentProps {
    entityName: string,
    defaultValue: any
}
export const ContentManagerEntryDialogContent = forwardRef<ChainDialogContentRef, ContentManagerEntryDialogContentProps>((props, ref) => {

    const myDialogContext = useMyDialogContext();
    const Header = useDynamicDialogHeader();
    const Footer = useDynamicDialogFooter();
    const { data: entitySchema, refetch } = useGetEntityFirstLevelSchemaQuery({ variables: { name: props.entityName } });
    const schema = useContentManagerFormSchema(entitySchema);
    const graphEntities = useEntities();
    const entity = useMemo(() => graphEntities?.entities.find(i => i.name == props.entityName), [graphEntities?.entities, props.entityName]);

    const id = useMemo(() => {
        return props.defaultValue?.id;
    }, [props.defaultValue]);

    const displayValue = useMemo(() => {
        if (!entitySchema) {
            return null;
        }

        const displayFieldProperty = entitySchema.entity?.displayField?.name;
        if (!displayFieldProperty) {
            return null;
        }

        if (displayFieldProperty == 'id') {
            return null;
        }

        return props.defaultValue?.[displayFieldProperty];
    }, [entitySchema, props.defaultValue]);

    const upperValueAsFieldValues = useMemo(() => {
        return Object.fromEntries(
            Object.entries(myDialogContext.upperResults ?? {}).map(([key, value]) => {
                return [key, value];
            }))
    }, [myDialogContext.upperResults]);

    const defaultValue = useMemo(() => ({
        ...props.defaultValue,
        ...upperValueAsFieldValues
    }), [props.defaultValue, upperValueAsFieldValues]);

    const dynamicForm = useDynamicForm({
        initialOpenMode: myDialogContext.openMode,
        defaultValue: defaultValue
    });

    useEffect(() => {
        dynamicForm.setLayoutItems(schema);
    }, [dynamicForm.setLayoutItems, schema]);

    const onSave = useCallback((formData: any) => {
        myDialogContext.closeWithResults(formData);
    }, [myDialogContext.closeWithResults]);

    const header = useMemo(() => {
        const fEntityName = entity?.caption ?? props.entityName;
        if (!displayValue) {
            return fEntityName;
        }
        return `${fEntityName}: ${displayValue}`;
    }, [displayValue, entity?.caption, props.entityName]);

    useImperativeHandle(ref, () => ({
        enterPressed: () => {
            dynamicForm.handleSubmit(onSave)();
        }
    }));

    useEffect(() => {
        refetch({
            name: props.entityName
        });
    }, [props.entityName]);

    return (
        <>
            <Header>
                {header}
            </Header>
            <DialogContent>
                <Stack
                    gap={2}>

                    {!!id && <Id value={id} rootProps={{
                        marginLeft: 'auto',
                    }} />}

                    <form onSubmit={(e) => e.preventDefault()} >
                        <DynamicLayoutFormFields dynamicForm={dynamicForm} />
                    </form>

                    {myDialogContext.openMode !== FormOpenMode.New && <BasicAuditTrail defaultValues={props.defaultValue} />}

                </Stack>
            </DialogContent>
            <Footer>
                <Stack
                    direction="row"
                    gap={1}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={dynamicForm.handleSubmit(onSave)}
                    >Save</Button>
                </Stack>
            </Footer>
        </>
    )
});
ContentManagerEntryDialogContent.displayName = 'ContentManagerEntryDialogContent';

interface BasicAuditTrailProps {
    defaultValues: any;
}
const BasicAuditTrail = ({ defaultValues }: BasicAuditTrailProps) => {

    if (!defaultValues) {
        defaultValues = {};
    }

    const { createdBy, createdAt, updatedBy, updatedAt } = defaultValues;
    const timelineEvents = useMemo((): HistoryEvent[] => {
        return [{
            label: 'Last Updated',
            details: (
                <Stack>
                    <Typography
                        color="text.secondary"
                        fontSize={12}
                        lineHeight='1.5rem'>
                        {dayjs(updatedAt).format(localeConfig.dateTime.displayFormat)}
                    </Typography>

                    <AvatarUserDetails
                        name={updatedBy?.name ?? 'Unknown'}
                        size="small"
                        typographyProps={{ color: "text.secondary" }} />

                </Stack>)
        }, {
            label: 'Created',
            details: (
                <Stack>
                    <Typography
                        color="text.secondary"
                        fontSize={12}
                        lineHeight='1.5rem'>
                        {dayjs(createdAt).format(localeConfig.dateTime.displayFormat)}
                    </Typography>

                    <AvatarUserDetails
                        name={createdBy?.name ?? 'Unknown'}
                        size="small" typographyProps={{ color: "text.secondary" }} />

                </Stack>)

        }];
    }, [createdBy, createdAt, updatedBy, updatedAt]);

    if (!defaultValues) {
        return null;
    }

    return (
        <HistoryTimeLine events={timelineEvents} />
    )
}