import { ContentManagerSearchState } from "@/types/content-manager-search-state";
import { UsersStore } from "@/types/content-manager-store-state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useContentManagerStoreRequest } from "./use-content-manager-store-request";
import { FullEntity } from "@/types/entity";
import { addNotification } from "@/lib/notifications/store";

interface UseContentManagerStoreParams {
    entityName: string
    fullEntity?: FullEntity | null,
    searchState: ContentManagerSearchState;
}
export const useContentManagerStore = (params: UseContentManagerStoreParams): UsersStore => {

    const { entityName, fullEntity, searchState } = params;

    const contentManagerStoreRequest = useContentManagerStoreRequest({entityName});
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [data, setData] = useState<[]>([]);
    const [dataConnection, setDataConnection] = useState<{ totalCount: number } | null>(null);

    const fetch = useCallback(() => {
        setDataLoading(true);
        contentManagerStoreRequest.fetchData({
            fields: fullEntity?.fields ?? [],
            edges: fullEntity?.edges ?? [],
            searchState: searchState!
        })
            ?.then((response: any) => {
                setData(response.data as []);
                setDataConnection(response.connection ?? { totalCount: 0 });
            }).finally(() => {
                setDataLoading(false);
            });
    }, [contentManagerStoreRequest,searchState, setData, setDataLoading, fullEntity?.fields, fullEntity?.edges]);

    const refresh = useCallback(() => {
        fetch();
    }, [fetch]);
    
    const addItem = useCallback((data: any) => {
        contentManagerStoreRequest.addItem(entityName,data)
            ?.then((response) => {
                fetch();
            })
            ?.catch(({message}) => {
                addNotification({ message, type: 'error' });
            });
    }, [ contentManagerStoreRequest.addItem, entityName, fetch, setDataLoading]);


    const addItems = useCallback((data: any[]) => {
        const promises = data.map(item => {
            return contentManagerStoreRequest.addItem(entityName, item)
                .catch(({message}) => {
                    addNotification({ message, type: 'error' });
                });
        });

        Promise.all(promises)
            .then(() => {
                fetch();
            });
    }, [contentManagerStoreRequest.addItem, entityName, fetch, setDataLoading]);

    const updateItem = useCallback((id: string, data: any) => {
        contentManagerStoreRequest.updateItem(entityName, id, data)
            ?.then((response) => {
                fetch();
            })
            ?.catch(({message}) => {
                addNotification({ message, type: 'error' });
            });
    }, [fetch, entityName, setDataLoading]);

    const deleteItem = useCallback((id: string) => {
        contentManagerStoreRequest.deleteItem(entityName, id)
            ?.then((response) => {
                fetch();
            })
            ?.catch(({message}) => {
                addNotification({ message, type: 'error' });
            });
    }, [fetch, entityName, setDataLoading]);

    const deleteBulk = useCallback((ids: Array<string>) => {
        contentManagerStoreRequest.deleteBulk(entityName, ids)
            ?.then((response) => {
                fetch();
            })
            ?.catch(({message}) => {
                addNotification({ message, type: 'error' });
            });
    }, [entityName, fetch]);

    useEffect(() => {
        if(!fullEntity){
            return;
        }

        if (fullEntity.loading) {
            return;
        }

        // if (fullEntity.isError) {
        //     return;
        // }
        
        fetch();
    }, [fullEntity, fetch]);

    const numberOfPages = useMemo(() => {
        if (!dataConnection) {
            return 1;
        }

        if (!dataConnection.totalCount) {
            return 1;
        }

        if (!searchState.rowsPerPage) {
            return 1;
        }

        return Math.ceil(dataConnection.totalCount / searchState.rowsPerPage);
    }, [dataConnection, searchState.rowsPerPage]);

    return useMemo(() => ({
        state: {
            data: data,
            schemaLoading: !fullEntity || fullEntity.loading,
            dataLoading: !fullEntity || fullEntity.loading || dataLoading,
            entityFields: fullEntity?.fields ?? [],
            entityEdges: fullEntity?.edges ?? [],

            dataConnection,
            pagesCount: numberOfPages,
            totalItems: dataConnection?.totalCount ?? 0
        },
        refresh,
        addItem,
        addItems,
        updateItem,
        deleteItem,
        deleteBulk
    }), [data, fullEntity?.loading, dataLoading, dataConnection?.totalCount, addItem, dataConnection, deleteBulk, deleteItem, numberOfPages, fullEntity?.edges, fullEntity?.fields, updateItem]);
}