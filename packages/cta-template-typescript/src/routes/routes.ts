import { IUseRouteProps } from "@/hooks";
import { lazy } from 'react';

export const routes: IUseRouteProps = [
    {
        private: false,
        path: '/',
        key: 'home',
        exact: true,
        component: lazy(() => import('@/modules/Home')),
    },
];