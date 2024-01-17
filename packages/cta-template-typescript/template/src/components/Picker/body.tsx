import React, { PropsWithChildren } from "react";

export type PickerBodyProps = {} & PropsWithChildren;

export function PickerBody(props: PickerBodyProps) {
    return (
        <div className="picker-body">
            {props.children}
        </div>
    );
}
