import EntityTypeBuilderEntities from "@/features/entity-type-designer/entity-type-designer-entities";
import { Box, Stack } from "@mui/material";
import AppLayout from "@/shared/layouts/appLayout";
import { withAuthGuard } from "@/hocs/with-auth-guard";
import { CurrentEntityProvider } from "@/hooks/use-current-entity";

const Layout = withAuthGuard((props: { children: React.ReactNode }) => {

    return (
        <CurrentEntityProvider>
            <AppLayout sideChildren={<EntityTypeBuilderEntities></EntityTypeBuilderEntities>}>
                <Stack
                    direction="row">
                    <Box
                        sx={{ width: '100%' }}>
                        {props.children}
                    </Box>
                </Stack>
            </AppLayout>
        </CurrentEntityProvider>)
})

export default Layout