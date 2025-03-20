import { useEffect, useRef } from "react";

export const useEffectDefaultValuesSet = (object: Record<string, any>, callback: (object: Record<string, any>) => void) => {
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (!hasInitializedRef.current && Object.keys(object).length > 0) {
            callback(object);
            hasInitializedRef.current = true;
        }
    }, [object, callback]);
}
