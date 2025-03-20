"use client";

import { alpha, ButtonBase, Divider, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, PaletteColor, Popover, Stack, SvgIcon, useColorScheme } from '@mui/material';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import { usePopover } from '@/hooks/use-popover';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import PersonIcon from '@mui/icons-material/Person';
import TerminalIcon from '@mui/icons-material/Terminal';
import LogoutIcon from '@mui/icons-material/Logout';
import NextLink from 'next/link';
import AvatarUserDetails from '@/shared/components/avatar-user-details';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { AuthContextType } from '@/core-features/auth/jwt-context';
import { useAuth } from '@/core-features/auth/use-auth';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/paths';
import { MenuButton } from '@/shared/components/menu/menu-button';
import { MenuItemToggle } from '@/shared/components/menu/menu-item-toggle';

export const NavUser = () => {

    const auth = useAuth() as AuthContextType;
    const router = useRouter();

    const { mode, setMode } = useColorScheme();

    const handleLogout = useCallback(() => {
        auth.signOut();
        router.push(paths.index);
    }, [auth.signOut]);

    return (
        <>

            <MenuButton
                slots={{
                    button: (<ButtonBase
                        sx={{
                            padding: '0 10px 0 5px',
                            borderRadius: '50px',
                            '&:focus-visible': {
                                backgroundColor: (theme) => theme.palette.action.selected
                            },
                        }}
                        aria-label="User menu"
                        aria-haspopup="menu">
                        <Stack direction="row" gap={2} alignItems="center">

                            <AvatarUserDetails
                                size="small"
                                name="Super User"
                            />
                            <SvgIcon
                                color="action"
                                fontSize="small"
                            >
                                <ChevronDownIcon />
                            </SvgIcon>
                        </Stack>
                    </ButtonBase>)
                }}>

                <MenuItem component={NextLink} href="/account">
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </MenuItem>


                <MenuItem>
                    <ListItemIcon>
                        <NightlightIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dark Mode" />
                    <MenuItemToggle value={mode === 'dark'} valueChange={(value) => setMode(value === true ? 'dark' : 'light')} />
                </MenuItem>

                <MenuItem component={NextLink} href="/developer">
                    <ListItemIcon>
                        <TerminalIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Developer" />
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </MenuItem>
                
            </MenuButton>
        </>
    )
};