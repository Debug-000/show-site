'use client'

import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, styled, IconButton, SvgIcon, ButtonProps, ListItemButtonProps, alpha, ListItemTextProps, Skeleton, Stack } from "@mui/material"
import { usePathname } from "next/navigation";
import NextLink from 'next/link';
import { PropsWithChildren, useMemo } from "react";
import { HiExternalLink } from "react-icons/hi";

const ListItemStyled = styled(ListItem)(({ theme }) => [
    {
        padding: '5px 12px',
        borderLeftStyle: 'solid',
        borderLeftWidth: 2,
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '-14px',
            left: '-2px',
            width: '12px',
            height: '35px',
            borderStyle: 'solid',
            borderWidth: '0 0 2px 2px',
            borderBottomLeftRadius: '8px'
        },
        '&:last-child': {
            borderLeftColor: 'transparent'
        }
    },
    theme.applyStyles('light', {
        borderLeftColor: 'var(--mui-palette-neutral-100)',
        '&:before': {
            borderColor: 'var(--mui-palette-neutral-100)',
        }
    }),
    theme.applyStyles('dark', {
        borderLeftColor: 'var(--mui-palette-background-paper)',
        '&:before': {
            borderColor: 'var(--mui-palette-background-paper)',
        }
    }),
]);

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
    margin: '0',
    color: alpha(theme.palette!.text.secondary, .6),
}));

interface TreeListProps {
    children: React.ReactNode
}
export const TreeList = (props: TreeListProps) => {

    const { children } = props;

    return (<List sx={{ padding: '5px 0 0 16px', overflow: 'hidden', position: "relative" }}>
        {children}
    </List>)
}

interface TreeListItemTextProps extends ListItemTextProps {
    label: string;
    icon?: React.ReactNode;
}
export const TreeListItemText = (props: PropsWithChildren<TreeListItemTextProps>) => {
    const { label, icon, children, ...other } = props;

    return (
        <ListItemStyled>
            <Stack width={1}>

                <ListItemText primary={label} {...other} slotProps={{
                    primary: {
                        sx: {
                            fontSize: '0.9rem',
                            paddingLeft: '10px'
                        },
                        ...other.slotProps?.primary
                    }
                }} />
                {icon && (<ListItemIconStyled>{icon}</ListItemIconStyled>)}
            </Stack>

            {children}

        </ListItemStyled>)
}


interface TreeListItemButtonProps extends ListItemButtonProps {
    label: string;
    icon?: React.ReactNode;
}
export const TreeListItemButton = (props: PropsWithChildren<TreeListItemButtonProps & ListItemButtonProps>) => {
    const { label, icon, children, ...other } = props;

    const ListItemButtonStyled = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
        padding: '0 10px',
        borderRadius: 1
    }));

    return (
        <ListItemStyled>
            <Stack width={1}>
                <ListItemButtonStyled
                    {...other} >

                    <ListItemText primary={label} slotProps={{
                        primary: {
                            fontSize: '0.9rem',
                        }
                    }} />
                    {icon && (<ListItemIconStyled sx={{ margin: 0 }}>{icon}</ListItemIconStyled>)}

                </ListItemButtonStyled>

                {children}

            </Stack>
        </ListItemStyled>)
}


interface TreeListItemNavigationProps extends ListItemButtonProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    active: boolean;
    externalLink?: boolean;
}
export const TreeListItemNavigation = (props: TreeListItemNavigationProps) => {
    const { label, path, icon, active, children, externalLink, ...other } = props;

    const ListItemButtonStyled = styled(ListItemButton)<ListItemButtonProps & { href: string }>(({ theme }) => ({
        padding: '0 10px', 
        borderRadius: 1,
        ...(active && {
            color: 'primary.main',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
        }),
    }));

    const textSx = {
        fontSize: '0.9rem',
        ...(active && {
            color: 'primary.main'
        })
    }

    const linkProps = externalLink
        ? {
            component: 'a',
            href: path,
            target: '_blank'
        }
        : {
            component: NextLink,
            href: path
        } as any;

    return (
        <ListItemStyled>
            <Stack width={1}>

                <ListItemButtonStyled 
                    {...other} 
                    {...linkProps}
                    LinkComponent={NextLink}>
                    <ListItemText primary={
                        <Stack direction="row" alignItems="center" gap={1}>
                            {label}
                            {externalLink && <HiExternalLink />}
                        </Stack>

                    } primaryTypographyProps={{ sx: textSx }} />
                    {icon && (<ListItemIconStyled>{icon}</ListItemIconStyled>)}
                </ListItemButtonStyled>

                {children}

            </Stack>
        </ListItemStyled>)
}



export const TreeListItemSkeleton = () => {
    const textSx = useMemo(() => ({
        paddingLeft: '5px'
    }), [])

    return (
        <ListItemStyled>
            <ListItemText primary={<Skeleton variant="text" />} sx={textSx}>
            </ListItemText>
        </ListItemStyled>)
}
