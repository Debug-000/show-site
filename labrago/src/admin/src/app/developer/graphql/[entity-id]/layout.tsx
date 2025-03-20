import { withAuthGuard } from "@/hocs/with-auth-guard"
import { CurrentEntityProvider } from "@/hooks/use-current-entity"
import { Box, Stack } from "@mui/material";

const Layout = withAuthGuard((props: { children: React.ReactNode }) => {
    return props.children
});

export default Layout