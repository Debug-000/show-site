import { Avatar, AvatarOwnProps, Stack, Typography, TypographyOwnProps } from "@mui/material";
import { useMemo } from "react";


type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarUserDetailsProps {
    name?: string;
    size?: AvatarSize;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    typographyProps?: TypographyOwnProps;
    avatarProps?: AvatarOwnProps;
}
export default function AvatarUserDetails({name, size = 'medium', direction = 'row', typographyProps, avatarProps}: AvatarUserDetailsProps) {
    
    const avatarSize = useMemo( () => size === 'small' ? 24 : size === 'medium' ? 34 : 44, [size]);
    const fonstSize = useMemo( () => size === 'small' ? '0.875rem' : size === 'medium' ? '1rem' : '1rem', [size]);

    return <>
        <Stack
            alignItems="center"
            spacing={1}
            direction={direction}
            >
            <Avatar
                alt="Super Admin"
                {...avatarProps}
                sx={{
                    width: avatarSize, 
                    height: avatarSize,
                    backgroundColor:"text.secondary",     
                    color: 'background.paper',
                    ...avatarProps?.sx, 
                }}
                // src="/static/images/avatar/1.jpg"
            ></Avatar>

            <Typography 
                fontSize={fonstSize}
                fontWeight={100}
                color="text.primary"
                {...typographyProps}
                >
                {name}
            </Typography>
        </Stack>

    </>
}