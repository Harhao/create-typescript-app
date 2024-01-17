export interface IUserState {
    name: string | null;
    token: string | null;
}

export interface IUserPayload {
    payload: IUserState;
    type: string;
}

const setSettingReducer = (state: IUserState, action: IUserPayload) => {
    state.name = action.payload.name;
    state.token = action.payload.token;
    return state;
};

const reducers = {
    setSettingData: setSettingReducer,
};

export default function settingReducer(
    state: Record<string, unknown>,
    action
) {
    return reducers;
}
