export function isWeChatEnv() {
    try {
        const ua = window.navigator.userAgent;
        return /MicroMessenger/i.test(ua) || /WindowsWechat/i.test(ua) || /WechatDevTools/i.test(ua);
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function fileToBase64(file: File, callback: Function): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        callback(reader.result);
    };
}

export function base64ToBlob(base64Url: string, filename?: string, mimeType?: string) {
    mimeType = mimeType || (base64Url.match(/^data:([^;]+);/) || '')[1];
    filename = filename || 'file.' + (mimeType.split('/')[1] || 'png')
    return fetch(base64Url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
}

export function dataURItoBlob(dataURI: string) {

    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);

    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
}

export async function downLoadImg(url: string, filename: string) {
    let response = await fetch(url);
    let blob = await response.blob();
    let objectUrl = window.URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href = objectUrl;
    a.download = filename;
    a.click()
    a.remove()
}

export function isIE9() {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE 9]><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}

export function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return '--:--';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const remainingSeconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));

    return (
        minutes.toString().padStart(2, '0') + ':' +
        remainingSeconds.toString().padStart(2, '0')
    );
}

export const isIEBrowser = () => {
    const ua = window.navigator.userAgent;
    return /MSIE|Trident/.test(ua);
}

export function getDevicePixelRatio() {
    let ratio = 1;
    if (window?.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
}


export function getAllQueryParams(): Record<string, string | null> {
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    const result: Record<string, any> = {};
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        const key = pair[0];
        const value = pair.length > 1 ? pair[1] : null;
        if (result[key] !== undefined) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }
            result[key].push(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}