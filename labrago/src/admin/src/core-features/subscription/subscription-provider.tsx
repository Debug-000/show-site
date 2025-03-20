import { CentrifugoClient } from '@/lib/centrifugo/centrifugo-client';
import { addNotification } from '@/lib/notifications/store';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from 'react';


export const SubscriptionContext = createContext<CentrifugoClient | null>(null);

export const useSubscription = () => {
    const client = useContext(SubscriptionContext);
    if (!client) {
        throw new Error('useSubscription must be used within SubscriptionProvider');
    }
    return client;
};

interface SubscriptionProviderProps {
}
export const SubscriptionProvider = ({ children }: PropsWithChildren<SubscriptionProviderProps>) => {
    const client = useMemo(() => {
        const centrifugo =  new CentrifugoClient('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE3Njg3NzM0NDh9.QtKStp21ze4mX6WRAwMvw_XBlsRuRbsdUJ_YCLpr6tg');
        centrifugo.onError((message) => {
            addNotification({
                    message: message,
                    type: 'error',
                }, true)
        });
        return centrifugo;
    }, []);

    useEffect(() => {
        client.connect();
        return () => client.disconnect();
    }, [client]);

    return (
        <SubscriptionContext.Provider value={client}>
            {children}
        </SubscriptionContext.Provider>
    );
};