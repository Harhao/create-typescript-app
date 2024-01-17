import React, { PropsWithChildren } from "react";

export type PickerFooterProps = {
    onClick?: (...args: any) => void;
} & PropsWithChildren;

export function PickerFooter(props: PickerFooterProps) {
    const handleClick = (args: any): void => {
        props?.onClick(args);
    };

    return (
        <div className="picker-footer" onClick={handleClick}>
            {props.children}
        </div>
    );
}
