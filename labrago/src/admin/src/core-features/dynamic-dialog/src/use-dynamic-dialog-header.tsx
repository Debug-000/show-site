import { ReactNode, useMemo } from "react";
import { useMyDialogContext } from "./use-my-dialog-context";
import { Box, DialogTitle, Divider, IconButton, Stack } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export const useDynamicDialogHeader = () => {

    const myDialogContext = useMyDialogContext();

    const headerComponenet = useMemo(() => {
        const header = ({ children }: { children?: ReactNode }) => {
            return (
                <>
                    <DialogTitle
                        m={0}
                        p={0}>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">

                            <Box>
                                {children}
                            </Box>

                            <IconButton
                                aria-label="close"
                                onClick={() => myDialogContext.close()}
                                sx={{
                                    padding: 0
                                }}
                            >
                                <CancelIcon />
                            </IconButton>

                        </Stack>
                    </DialogTitle>
                    <Divider />
                </>
            )
        }

        return header;
    }, [myDialogContext.close]);

    return headerComponenet;
}
