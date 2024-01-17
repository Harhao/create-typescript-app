import React, {
    createRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import type { ReactElement, FC } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { ToastProps, NativeProps } from './toast-props';
import classNames from 'classnames';

export type ToastShowProps = Omit<ToastProps, 'visible'>;

export interface ToastShowRef {
    close: () => void;
}

const defaultProps = {
    duration: 2000,
};

// 渲染 Toast并挂载到body上
function renderToBody(element: ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    function unmount() {
        const unmountResult = ReactDOM.unmountComponentAtNode(container);
        if (unmountResult && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }
    ReactDOM.render(element, container);
    return unmount;
}

//暴露show方法给使用者
export function show(this: FC<ToastProps>, props: ToastShowProps) {
    const duration = props?.duration ?? defaultProps.duration;
    const Toast = this;
    let unMountFn: () => void = () => { };

    const Wrapper = forwardRef<ToastShowRef, ToastProps>((_, ref) => {
        const [visible, setVisible] = useState(false);
        const handleClose = () => {
            setVisible(false);
            props?.afterClose?.();
        };
        useEffect(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            close: handleClose,
        }));

        const handleAfterClose = () => {
            unMountFn && unMountFn();
            props.afterClose && props.afterClose();
        };

        return (
            <Toast
                {...props}
                visible={visible}
                handleClose={handleClose}
                afterClose={handleAfterClose}
            >{props?.content}</Toast>
        );
    });

    const ref = createRef<ToastShowRef>();
    unMountFn = renderToBody(<Wrapper ref={ref} />);


    if (!!duration) {
        window.setTimeout(() => {
            ref.current?.close();
            unMountFn();
        }, duration);
    }

    return {
        close: () => {
            ref.current?.close();
        },
    };
}

// 浅合并属性值
export function MergeProps(props: ToastProps) {
    const defaultProps = {
        visible: false,
        mask: true,
        maskClosable: false,
        closable: true,
        width: '360',
    };
    return { ...defaultProps, ...props };
}

export function withNativeProps<P extends NativeProps>(
    props: P,
    element: ReactElement
) {
    const p = {
        ...element.props,
    };
    if (props.className) {
        p.className = classNames(element.props.className, props.className);
    }
    if (props.style) {
        p.style = {
            ...p.style,
            ...props.style,
        };
    }
    for (const key in props) {
        // eslint-disable-next-line no-prototype-builtins
        if (!props.hasOwnProperty(key)) continue;
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            p[key] = props[key];
        }
    }
    return React.cloneElement(element, p);
}

// 绑定show的调用方法(后续confirm，alert等)
export function attachPropertiesToComponent<C, P extends Record<string, any>>(
    component: C,
    properties: P
): C & P {
    const ret = component as any;
    for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
            ret[key] = properties[key];
        }
    }
    return ret;
}

export type GetContainer = HTMLElement | (() => HTMLElement) | null | undefined;
function resolveContainer(getContainer: GetContainer) {
    const container =
        typeof getContainer === 'function' ? getContainer() : getContainer;
    return container || document.body;
}
export function renderToContainer(
    getContainer: GetContainer,
    node: ReactElement
) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
}

export default show;
