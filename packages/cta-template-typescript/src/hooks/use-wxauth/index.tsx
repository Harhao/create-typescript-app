import wx from "weixin-js-sdk";
import { getWxConfig } from "@/api";
import { useEffect } from "react";
import { EResponseCode } from "@/const";

export interface IWXAuthConfig {
    appId: string; //微信公众号appId
    jsApiList: string[]; //需要使用的接口列表
    onReadyCallback?: VoidFunction;
    onErrorCallback?: (e) => void;
}

export interface IShareMessage {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    type: 'music' | 'video' | 'link';
    dataUrl?: string;
    success?: VoidFunction;
}

const defaultApiList = ["onMenuShareAppMessage",];

export function useWXAuth(config: IWXAuthConfig) {

    const onAuthInit = async () => {
        try {
            const params = {
                url: window.location.href,
                appId: config.appId,
            };
            const res = await getWxConfig(params);
            if (res?.code === EResponseCode.SUCCESS) {
                const { appId, timestamp, nonceStr, signature, applicationAppId } =
                    res.result;

                const apiList = Array.from(new Set([...defaultApiList, ...config.jsApiList]));
                wx.config({
                    debug: false, // 开启调试模式
                    appId: `${appId}`, // 必填，公众号的唯一标识
                    timestamp: `${timestamp}`, // 必填，生成签名的时间戳
                    nonceStr: `${nonceStr}`, // 必填，生成签名的随机串
                    signature: `${signature}`, // 必填，签名
                    jsApiList: apiList,
                });

                wx.ready(function () {
                    // 添加按钮点击事件和设置跳转客户端extInfo
                    console.log('准备就绪event');
                    config?.onReadyCallback?.();
                });

                wx.error(function (res: any) {
                    // 主要针对微信版本低，或者跳转失败情况，转跳应用宝等兜底处理
                    console.log("执行失败", res);
                    config?.onErrorCallback?.(res)
                });
            }

        } catch (e) {
            console.log('onAuthInit error', e);
        }
    }


    // 分享给朋友
    const onShareAppMessage = (shareMessage: IShareMessage) => {
        wx.onMenuShareAppMessage(shareMessage);
    }

    useEffect(() => {
        onAuthInit();
    }, []);

    return {
        onShareAppMessage,
    }
}