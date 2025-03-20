'use client'

import { AuthContextType } from "@/core-features/auth/jwt-context";
import { useAuth } from "@/core-features/auth/use-auth";
import { DynamicLayoutFormFields, FormProvider } from "@/core-features/dynamic-form/dynamic-layout-form";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import { paths } from "@/lib/paths";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import NextLink from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback } from "react";



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
    }]
};

const defaultValue = {
    email: 'abc@labrago.eu',
    password: '1234'
}

export default function AuthPage() {

    const auth = useAuth() as AuthContextType;
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    const dynamicForm = useDynamicForm({ initialOpenMode: FormOpenMode.New, initialLayout: formItems, defaultValue: defaultValue });

    const onSubmit = useCallback(async (data: any) => {
        await auth.signIn(data.email);
        router.push(returnTo || paths.contentManager.index);
    }, [auth.signIn]);

    return (<>

        <Box  sx={{ pt: 7, pb: 14  }}>

        <Typography textAlign="center" fontWeight={100} fontSize={48} fontFamily="Roboto"  sx={{ mb: 7  }}>
            Labra·GO
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
                        Login
                    </Typography>
                    {/* <Button
                        component={NextLink}
                        href={paths.auth.jwt.register}
                    >
                        Sign Up
                    </Button> */}
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
                    Login
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
                <Alert
                    // @ts-ignore
                    color="primary"
                    severity="info"
                    sx={{ mt: 3 }}
                >
                    You can use <strong>abc@labrago.eu</strong>
                </Alert>


            </form>

        </Box>
    </>
    )
}
