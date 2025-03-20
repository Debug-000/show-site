import { useEffect, useRef } from "react";
import { useSubscription } from "./subscription-provider";
import { UserMessageMessage } from "@/types/centrifugo";
import { addNotification } from "@/lib/notifications/store";

export const UserMessagesSubscription = () => {

    const client = useSubscription();

    useEffect(() => {
        return client.subscribe('USER_MESSAGE', (data: UserMessageMessage) => {
             addNotification({
                message: data.message,
                type: data.severity ?? 'info',
             }, true)
        });
    }, [client]);

    return null;
}
