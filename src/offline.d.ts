declare module '@redux-offline/redux-offline/lib/types' {
    export interface ResultAction {
        meta: {
            completed: boolean;
            success: boolean;
        };
        payload?: object;
        type: string;
    }

    export interface OfflineMetadata {
        commit?: ResultAction;
        effect: object;
        rollback?: ResultAction;
    }
}