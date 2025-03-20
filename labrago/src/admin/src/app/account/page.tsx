'use client'

import { useDocumentTitle } from "@/hooks/use-document-title";
import { DynamicLayoutFormFields } from "@/core-features/dynamic-form/dynamic-layout-form";
import { FormField, FormOpenMode } from "@/core-features/dynamic-form/form-field";
import { useDynamicForm } from "@/core-features/dynamic-form/use-dynamic-form";
import { dynamicLayoutItem } from "@/core-features/dynamic-layout/src/dynamic-layout";
import SaveIcon from '@mui/icons-material/Save';
import { Container, Stack, Box, Card, CardContent, Typography, Grid, Paper, styled, Button, SvgIcon } from "@mui/material";
import { PageHeader } from "@/shared/components/page-header";
import AvatarUserDetails from "@/shared/components/avatar-user-details";


const formItems: dynamicLayoutItem<FormField> = {
    type: 'group',
    direction: 'vertical',
    gap: 1.5,
    children: [{
        data: {
            type: 'ShortText',
            name: 'name',
            label: 'Name',
            required: true,
        }
    }, {
        data: {
            type: 'Email',
            name: 'email',
            label: 'E-mail',
            required: true
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'address',
            label: 'address',
            required: true
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'zip',
            label: 'ZIP Code',
            required: true
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'company',
            label: 'Company',
            required: true
        }
    }, {
        data: {
            type: 'ShortText',
            name: 'caption',
            label: 'Display Name',
            required: true
        }
    }]
};


const defaultValue = {
    name: "Super User",
    email: "super@golabra.com",
    address: "123 Main Street",
    zip: "12345",
    company: "Golabra",
    caption: "Super User"
}


export default function ContentManager() {

    useDocumentTitle({ title: 'User Account' });

    const dynamicForm = useDynamicForm({ initialOpenMode: FormOpenMode.New, initialLayout: formItems, defaultValue: defaultValue });

    return (

        <Container
            maxWidth="md"
            sx={{
                py: 2
            }}>

            <Stack
                spacing={2}
                sx={{ height: '100%' }}>

                <PageHeader
                    sx={{
                        pl: 1
                    }}>
                    <Stack
                        align-items="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}>

                        <Typography variant="h2">
                            User Account
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}>

                            <Button
                                size="medium"
                                variant="contained"
                                startIcon={<SvgIcon fontSize="small"><SaveIcon /></SvgIcon>}>
                                Save
                            </Button>
                        </Stack>

                    </Stack>
                </PageHeader>

                <Box>

                    <Grid container spacing={2} className="andrei">
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Stack>
                                        <br /><br /><br />
                                        <AvatarUserDetails name="Super User" size="large" direction="column" />
                                        <br />
                                        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                            max size of 3 Mb
                                        </Typography>
                                        <br /><br /><br />
                                        <br /><br /><br />
                                    </Stack>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Card>
                                <CardContent>




                                    <form onSubmit={(e) =>  e.preventDefault()} >
                                        <DynamicLayoutFormFields dynamicForm={dynamicForm} />

                                    </form>



                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>


                </Box>

            </Stack>
        </Container>

    )
}