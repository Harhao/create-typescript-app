import React from "react";
import Router from '@/routes/index';
import SafeRoot from "@/components/SafeRoot";

import { StoreProvider } from "@/stores";
import { defaultValue } from "@/stores/state";

import './index.less';


export default function App() {
    return (
        <StoreProvider {...defaultValue}>
            <SafeRoot>
                <Router />
            </SafeRoot>
        </StoreProvider>
    );
}