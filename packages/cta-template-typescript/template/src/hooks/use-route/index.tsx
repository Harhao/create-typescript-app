import { ThemeProvider } from "styled-components";
import React, { LazyExoticComponent, Suspense } from 'react';

import { useStore } from '@/stores';
import { RootContainer } from "@/components/Theme";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

type IRouteItem = {
    path: string;
    component: LazyExoticComponent<() => React.JSX.Element>;
    private: boolean;
    key?: string;
    exact?: boolean;
    children?: IRouteItem[] |  null;
};

export type IUseRouteProps = IRouteItem[];


const PrivateRoute = (props: IRouteItem) => {
    const store = useStore();
    //@ts-ignore
    const { token = null  } = store.getState()?.user;

    return !token? (
        <Redirect to="/" /> 
    ): <Route {...props} />
}


export function useRoute(routes: IUseRouteProps): React.JSX.Element {

    return (
        <ThemeProvider
            theme={themeColor}
        >
            <RootContainer>
                <Suspense fallback={<></>}>
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
            </RootContainer>
        </ThemeProvider>
    );
}