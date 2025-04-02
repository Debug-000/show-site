import { stringAvatar } from "@/lib/utils/avatar";
import { Box, Stack, Avatar, Paper, Card, CardContent, Divider } from "@mui/material"
import { PropsWithChildren } from "react";

interface UserBadgeProps {
    name: string;
}
export const UserBadge = (props: PropsWithChildren<UserBadgeProps>) => {

    const avatarProps = stringAvatar(props.name);

    return (
        <Card sx={{
            overflow: 'visible',
        }}>
            <CardContent>
                <Box className="test" sx={{
                    height: '1px',
                    position: 'relative',
                    /* background-color: red; */
                    margin: 0,
                    padding: 0,
                }}>
                    <Stack alignItems="center" justifyContent="center" 
                    
                    sx={{
                        width: 'fit-content',
                        margin: 'auto',
                        padding: '8px',
                        borderRadius: '100%',
                        position: 'absolute',
                        transform: 'translateY(-85%)',
                        left: 0,
                        right: 0,
                        'background-color': 'var(--mui-palette-background-default)',
                    }}>
                        <Avatar sx={{ width: 65, height: 65, fontSize: '2rem', ...avatarProps.sx }} >{avatarProps.children}</Avatar>
                    </Stack>
                </Box>
            </CardContent>
            <CardContent>
            {/* <Divider sx={{ borderStyle: 'dotted', borderTopWidth: '5px', borderBottomWidth: 0, borderColor: 'var(--mui-palette-background-default)' }} /> */}
                {props.children}
            </CardContent>
        </Card>
    )
}