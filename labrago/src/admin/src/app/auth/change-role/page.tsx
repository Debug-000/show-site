'use client'

import { AuthContextType } from "@/core-features/auth/jwt-context";
import { useAuth } from "@/core-features/auth/use-auth";
import { DynamicLayoutFormFields, FormProvider } from "@/core-features/dynamic-form/dynamic-layout-form";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { paths } from "@/lib/paths";
import { Copywrite } from "@/shared/components/copywrite";
import { Alert, Box, Button, Avatar, Stack, TextField, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { stringAvatar, avatarBorderStyle } from '@/lib/utils/avatar';
import { gql, useLazyQuery } from "@apollo/client";
import { getJwtRole } from "@/lib/utils/jwt";


const defaultValue = {}

export default function AuthPage() {

    const auth = useAuth<AuthContextType>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    const currentRole = useMemo(() => getJwtRole(globalThis.localStorage.getItem("accessToken")), []);
      


    const formItems: dynamicLayoutItem<FormField> = useMemo(() => ({
        type: 'group',
        direction: 'vertical',
        gap: 1.5,
        children: [{
            data: {
                type: 'SingleChoice',
                name: 'role',
                label: 'Role',
                options: auth.user?.roles?.map(i => ({
                    label: i.name,
                    value: i.name
                })) ?? [],
                defaultValue: currentRole,
                required: true,
            }
        }]
    }), []);


    const dynamicForm = useDynamicForm({ initialOpenMode: FormOpenMode.New, initialLayout: formItems, defaultValue: defaultValue });

    const onSubmit = useCallback(async (data: any) => {
        await auth.changeRole(data.role);
        router.push(returnTo || paths.contentManager.index);
    }, [auth.signUp]);

    const userName = auth.user?.name ?? '';
    const avatarProps = stringAvatar(userName);

    return (<>

        <Box sx={{ pt: 7, pb: 14 }}>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ ...avatarBorderStyle, mb: 7 }}>
                <Avatar sx={{ width: 65, height: 65, fontSize: '2rem', ...avatarProps.sx }} >{avatarProps.children}</Avatar>
            </Stack>

            <form onSubmit={dynamicForm.handleSubmit(onSubmit)} >

                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="end"
                    spacing={1}
                    sx={{ mb: 3 }}
                >
                    <Button
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>
                </Stack>


                <DynamicLayoutFormFields dynamicForm={dynamicForm} />

                <Button
                    //disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                >
                    Login with role
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3
                    }}
                >
                    {/* <Button
                        component={NextLink}
                        href="#"
                    >
                        Forgot password
                    </Button> */}
                </Box>

                <Box textAlign="center" sx={{ mt: 3 }}>
                    <Copywrite />
                </Box>

            </form>

        </Box>
    </>
    )
}
