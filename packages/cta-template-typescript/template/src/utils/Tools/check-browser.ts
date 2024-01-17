export function isWeChatEnv() {
    try {
        const ua = window.navigator.userAgent;
        return /MicroMessenger/i.test(ua) || /WindowsWechat/i.test(ua) || /WechatDevTools/i.test(ua);
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const isIEBrowser = () => {
    const ua = window.navigator.userAgent;
    return /MSIE|Trident/.test(ua);
}

export function isIE9() {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE 9]><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}

export function getDevicePixelRatio() {
    let ratio = 1;
    if (window?.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
}