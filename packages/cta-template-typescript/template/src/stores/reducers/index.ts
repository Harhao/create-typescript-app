import userReducer from './user';
import configReducer from './config';

export type StoreAction = {
    type: string;
    payload?: any;
};

export function combinedReducer(
    state: any,
    action: StoreAction,
) {
    const reducers = {
        user: userReducer(state.setting, action),
    };

    const onGetCallbackFunc = (reducers, state, action) => {
        const [scope, ...attrs] = action.type.split('.');
        let func = reducers;

        for (let [_, value] of Object.entries([scope, ...attrs])) {
            func = func[value as typeof reducers];
        }

        return {
            ...state,
            [`${scope}`]: func(state[scope], action),
        };
    }

    return onGetCallbackFunc(reducers, state, action);
}