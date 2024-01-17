import React, { useEffect, useState, useRef, PropsWithChildren } from "react";
import { PickerBody } from "./body";
import { PickerFooter } from "./footer";
import { AvatarPickerContainer } from "../Theme";

import classNames from "classnames";
import "./picker.less";


export type PickerProps = {
    visible: boolean;
    cancelText?: string;
    className?: string;
    onClose?: () => void;
    onCancel?: () => void;
} & PropsWithChildren;

export function Picker(props: PickerProps) {

    const [_visible, setVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        props?.onClose?.();
    };

    const handleCancel = () => {
        props?.onCancel?.();
        close();
    };

    const close = () => {
        setVisible(false);
        handleClose()
    };

    const handleTouchMove = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const { cancelText, className } = props;

    const rootClass = classNames(
        "picker-wrapper",
        { "picker-wrapper-active": _visible },
        className
    );


    useEffect(() => {
        if (props?.visible !== _visible) {
            setVisible(props?.visible);
            !props.visible && handleClose();
        }
    }, [props.visible, _visible]);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight);
        }
    }, []);

    return (
        <div 
            className={rootClass} 
            onTouchMove={handleTouchMove}
        >
            <div className="picker-overlay" onClick={close}></div>
            <AvatarPickerContainer 
                className="picker-container"
                ref={containerRef}
                style={{
                    bottom: `-${containerHeight}px`,
                    transform: _visible ? (
                        `translate3d(0, -${containerHeight}px, 0)`
                    ): (
                        `translate3d(0, ${containerHeight}px, 0)`
                    )
                }}
            >
                <PickerBody>{props.children}</PickerBody>
                {cancelText && (
                    <PickerFooter onClick={handleCancel}>
                        {cancelText}
                    </PickerFooter>
                )}
            </AvatarPickerContainer>
        </div>
    );
}