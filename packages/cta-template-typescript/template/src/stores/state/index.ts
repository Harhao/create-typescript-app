import userSlice from "./user";
import configSlice from "./config";

export const defaultInitData = {
    user: userSlice,
};

export type InitialStore = typeof defaultInitData;

export const initialState = (config: InitialStore): InitialStore => {
    return {
        ...defaultInitData,
        ...config
    };
};

