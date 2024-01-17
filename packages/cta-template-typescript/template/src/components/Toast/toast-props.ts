import React, { ReactNode, CSSProperties } from 'react';

export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
  children?: React.ReactNode;
}

//基础内部modal的props
interface IBaseToastProps {
  visible: boolean;
  mask: boolean;
  maskClosable: boolean;
  maskStyle: CSSProperties;
  maskClassName: string;
  closable: boolean;
  width: string | number;
  duration?: number;
  className: string;
  style: CSSProperties;
  content: ReactNode | string;
  GetContainer: HTMLElement | (() => HTMLElement) | null | undefined;
  destroyOnClose: boolean;
  afterClose: () => void;
  handleClose: () => void;
}

export type ToastProps = Partial<IBaseToastProps> & NativeProps;
