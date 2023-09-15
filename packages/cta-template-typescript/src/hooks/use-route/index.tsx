import React, { LazyExoticComponent, Suspense } from 'react';
import SpinLoading from '@/modules/SpinLoading';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from '@/stores';

type IRouteItem = {
    path: string;
    component: LazyExoticComponent<() => React.JSX.Element>;
    private: boolean;
    key?: string;
    exact?: boolean;
    children?: IRouteItem[];
};
export type IUseRouteProps = IRouteItem[];


const PrivateRoute = (props: IRouteItem) => {
    //@ts-ignore
    const [store] = useStore();
    const { token = null } = store;
    return !token ? <Redirect to="/" /> : <Route {...props} />
}


export function useRoute(routes: IUseRouteProps): React.JSX.Element {

    return (
        <Suspense fallback={<SpinLoading />}>
            <HashRouter>
                <Switch>
                    {
                        routes.map((props: IRouteItem) => {
                            return props?.private ?
                                <PrivateRoute {...props} /> : <Route {...props} />
                        })
                    }
                </Switch>
            </HashRouter>
        </Suspense>
    );
}