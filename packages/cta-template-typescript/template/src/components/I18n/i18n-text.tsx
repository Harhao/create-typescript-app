import React from 'react';
import { useStore } from 'react-redux';
import { i18n } from './i18n';

type props = {
    text: string,
    patterns?: string[];
}

export const I18nText = (props: props) => {
    const store = useStore();
    
    //@ts-ignore
    const { language } = store.getState().user;

    const { text, patterns = [] } = props;
    const output = i18n({ language, text, patterns });

    return (
        <>{output}</>
    );
}