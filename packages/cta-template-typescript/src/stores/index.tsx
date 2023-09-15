import React, { createContext, useReducer, useContext, ReactElement } from 'react';
import { initialState, InitialStore } from './state';
import { reducer, StoreAction } from './reducer';

export type StoreProviderProps = {
    children?: ReactElement;
} & InitialStore;

const Context = createContext({});

export const useStore = function (): [InitialStore, (action: StoreAction) => {}] {
    // @ts-ignore
    return useContext(Context);
}

export const StoreProvider = function ({ children, ...storeData }: StoreProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState({ ...storeData }));

    if (!store.isReady) {
        store.isReady = true;
        store.dispatch = params => dispatch(params);
        Object.freeze(store);
    }

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

const store = {
    isReady: false,
    dispatch: (params: any) => {
        console.error('store is NOT ready');
    },
}

export default store