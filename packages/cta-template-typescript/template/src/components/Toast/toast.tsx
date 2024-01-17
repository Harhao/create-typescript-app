import React, { useState, useEffect } from 'react';
import store from "@/store";

import { themeData } from '../Theme';
import { ToastProps } from './toast-props';
import { MergeProps, renderToContainer } from './show';
import { CSSTransition } from 'react-transition-group';

import "animate.css";
import './toast.less';



const defaultProps = {
    GetContainer: () => document.querySelector('.safe-area-content');
}

export const Toast = (p: ToastProps) => {
    const mergeProps = {...defaultProps, ...p,} as ToastProps;
    const props = MergeProps(mergeProps);

    const [rootShow, setRootShow] = useState(false);

    useEffect(() => {
        setRootShow(props.visible);
    }, [props.visible]);


    const RenderContent = () => {
        const { user } = store.getState();

        const styleProperty = {
            color: themeData[user.theme]?.avatar_toast_font_color,
            background: themeData[user.theme]?.avatar_toast_background_color,
        };

        return (
            <div 
                style={styleProperty}
                className='toast-content-container animate__animated animate__fadeIn animate__faster'
            >  
                <div className='toast-content'>{props?.children}</div>
            </div>
        );
    }


    const renderRoot = () => {
        return (
            <div
                className='toast-container'
                style={{
                    display: rootShow ? 'block' : 'none',
                }}
            >
                <div className='toast-mask animate__animated animate__fadeIn animate__fast'></div>
                <CSSTransition
                    timeout={500}
                    in={props?.visible}
                    unmountOnExit={props.destroyOnClose}
                    onExited={() => {
                        setRootShow(false);
                        props.afterClose && props.afterClose();
                    }}
                >
                    <RenderContent />
                </CSSTransition>
            </div>
        );
    };

    return renderToContainer(props.GetContainer, renderRoot());
};
export default Toast;
