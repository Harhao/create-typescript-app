import React from "react";
import Router from '@/routes';

import { StoreProvider } from "@/stores";
import { defaultInitData } from "@/stores/state";

import './index.less';


export default function App() {
    return (
        <StoreProvider {...defaultInitData}>
            <Router />
        </StoreProvider>
    );
}