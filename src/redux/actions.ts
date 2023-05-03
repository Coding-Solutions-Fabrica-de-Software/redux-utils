import { Action, OfflineActionObject, OfflineAction } from './types'

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(
    type: T,
    payload: P
): Action<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
    const action = payload === undefined ? { type } : { type, payload }

    return action
}

export function createOfflineAction<
    T extends string,
    P,
    M extends OfflineActionObject
>(type: T, payload: P, meta: M): OfflineAction<T, P, M>;

export function createOfflineAction<
    T extends string,
    P,
    M extends OfflineActionObject
>(type: T, payload?: P, meta?: M) {
    return payload === undefined ? { type } : { type, payload, meta };
}