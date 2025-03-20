import { styled, alpha} from "@mui/material";
import { Box } from "@mui/material";

export const PageHeader = styled(Box)(
    ({ theme }) => ({
        position: "sticky",
        top: 64,
        zIndex: 10,
        backgroundColor: 'var(--mui-palette-background-default)',
        padding: '8px 0',
        
        // this is to hide the shadow of the body (left and right)
        boxShadow: `-3px 0 0px 0px  var(--mui-palette-background-default), 6px 0 0px 0px var(--mui-palette-background-default)`,
        
        
        /* blur page header */
        //backdropFilter: 'blur(10px)',
        // backgroundColor: alpha(theme.palette.background.default, 0.7),
        // '::before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     width: '30%',
        //     height: '100%',
        //     pointerEvents: 'none',
        //     background: `linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 100%)`,
        //     zIndex: -1,
        // },
        // '::after': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     right: 0,
        //     width: '30%',
        //     height: '100%',
        //     pointerEvents: 'none',
        //     background: `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
        //     zIndex: -1,
        // }
    })
);