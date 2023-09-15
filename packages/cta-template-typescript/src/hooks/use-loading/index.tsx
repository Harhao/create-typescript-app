import React, { useRef } from 'react';
import Toast from '@/components/Toast';
import "./index.less";

const defaultLoadingTexts = [
    "掌声欢迎",
    "AI魔法师就位",
    "他拿起了画笔",
    "开始调色",
    "加一点热情的红色",
    "加一点甜蜜的粉红色",
    "来一点忠诚的蓝色",
    "嘿嘿，哈哈哈",
    "跟他一起念爱情大魔咒",
    "魔法图片正在生成",
];

export function useLoading(loadingList: string[] = defaultLoadingTexts, intervalTime: number = 1500) {

    const loadingTextRef = useRef<HTMLSpanElement>(null);

    const Loading = () => {
        return (
            <div className='use-loading-container'>
                <div className='use-loading-img'></div>
                <span 
                    className='use-loading-text'
                    ref={loadingTextRef}
                >{loadingList[0]}</span>
            </div>
        );
    }

    const onStartLoading = () => {
        //@ts-ignore
        const toastHandle = Toast.show({
            content: <Loading />,
        });
        const interval = setInterval(() => {
            const text = loadingList.shift();
            loadingTextRef.current.innerHTML = text;
            loadingList.push(text!!);
        }, intervalTime);
        return {
            interval,
            toastHandle,
        }
    };

    const onStopHandle = ({ interval, toastHandle}) => {
        clearInterval(interval);
        toastHandle?.close();
    }

    return {
        onStart: onStartLoading,
        onStop: onStopHandle,
    }   

}