import { InitialStore } from "./state";

export type StoreAction = {
    type: string;
    payload?: any;
};

export const reducer = function (
    state: InitialStore,
    action: StoreAction
): InitialStore {
    switch (action.type) {
        case "changeState":
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }
};
