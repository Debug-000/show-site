'use client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ApplicationMood } from "@/shared/layouts/application-mood/application-mood";
import { SubscriptionProvider } from '@/core-features/subscription/subscription-provider';
import { ApplicationStatusSubscription } from '@/core-features/subscription/application-status-subscription';
import { UserMessagesSubscription } from '@/core-features/subscription/user-messages-subscription';
import { SnackbarProvider } from '@/lib/snackbarProvider';
import { AuthConsumer, AuthProvider } from '@/core-features/auth/jwt-context';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
                

                       <SubscriptionProvider>
                            <SnackbarProvider>
                                <ApplicationStatusSubscription />
                                <UserMessagesSubscription />

                                <ApplicationMood />
                                {children}
                            </SnackbarProvider>
                        </SubscriptionProvider>
             
            </AuthProvider>
        </LocalizationProvider>
    );
}