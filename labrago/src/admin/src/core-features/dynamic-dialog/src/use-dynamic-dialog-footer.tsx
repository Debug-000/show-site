import { ReactNode, useMemo } from "react";
import { useMyDialogContext } from "./use-my-dialog-context";
import { DialogActions, Divider } from "@mui/material";

export const useDynamicDialogFooter = () => {

    const myDialogContext = useMyDialogContext();

    const footerComponenet = useMemo(() => {
        const footer = ({ children }: { children?: ReactNode }) => {
            return (
                <>
                    <Divider />
                    <DialogActions>
                        {children}
                    </DialogActions>
                </>
            )
        }
        return footer;
    }, [myDialogContext.close]);

    return footerComponenet;
}
