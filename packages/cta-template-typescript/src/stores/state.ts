export type InitialStore = {
   isLogin: boolean;
   uid: string;
};


export const defaultValue = {
    uid: '',
    isLogin: false,
};

export const initialState = (config: InitialStore): InitialStore => {
    return {
        ...defaultValue,
        ...config
    };
};
