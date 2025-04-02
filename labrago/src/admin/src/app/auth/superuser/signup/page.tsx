'use client'

import { AuthContextType } from "@/core-features/auth/jwt-context";
import { useAuth } from "@/core-features/auth/use-auth";
import { DynamicLayoutFormFields, FormProvider } from "@/core-features/dynamic-form/dynamic-layout-form";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { paths } from "@/lib/paths";
import { Copywrite } from "@/shared/components/copywrite";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import NextLink from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback } from "react";
import { PRODUCT_NAME } from '@/config/CONST';
import { gql } from "@apollo/client";



const formItems: dynamicLayoutItem<FormField> = {
    type: 'group',
    direction: 'vertical',
    gap: 1.5,
    children: [{
        data: {
            type: 'Email',
            name: 'email',
            label: 'Email address',
            required: true,
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'firstName',
            label: 'First name',
            required: true,
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'lastName',
            label: 'Last name',
            required: true,
        }
    }, {
        data: {
            type: 'Password',
            name: 'password',
            label: 'Password',
            required: true,
        }
    }]
};

const defaultValue = {}

export default function AuthPage() {

    const auth = useAuth<AuthContextType>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    const dynamicForm = useDynamicForm({ initialOpenMode: FormOpenMode.New, initialLayout: formItems, defaultValue: defaultValue });

    const onSubmit = useCallback(async (data: any) => {
        await auth.signUp(data);
        router.push(returnTo || paths.auth.jwt.login);
    }, [auth.signUp]);

    return (<>

        <Box sx={{ pt: 7, pb: 14 }}>

            <Typography textAlign="center" fontWeight={100} fontSize={48} fontFamily="Roboto" sx={{ mb: 7 }}>
                {PRODUCT_NAME}
            </Typography>

            <form onSubmit={dynamicForm.handleSubmit(onSubmit)} >

                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ mb: 3 }}
                >
                    <Typography variant="h4">
                        Superuser Sign Up
                    </Typography>
                    <Button
                        component={NextLink}
                        href={paths.auth.jwt.login}
                    >
                        Sign In
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
                    Sign Up
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
