

export function fileToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result as string);
        };
    })
}

export function handleFetchCompatibility(base64Url: string, filename?: string, mimeType?: string) {
    // 执行兼容处理操作
    // 这里可以使用兼容方案
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', base64Url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
            if (xhr.status === 200) {
                const arrayBuffer = xhr.response;
                const blob = new Blob([arrayBuffer], { type: mimeType });
                resolve(new File([blob], filename, { type: mimeType }));
            } else {
                reject(new Error('Base64 to Blob conversion failed'));
            }
        };

        xhr.onerror = function (err) {
            // 处理错误
            console.error('发生异常错误:', err);
            // 执行兼容处理操作
            reject(err);
        };

        xhr.send();
    });
}

export function base64ToBlob(base64Url: string, filename?: string, mimeType?: string) {
    console.log('转换的格式是', mimeType);
    return new Promise((resolve) => {
        const file = dataURItoBlob(base64Url, filename, mimeType);
        resolve(file);
    }).catch(e => {
        console.error(e);
        return handleFetchCompatibility(base64Url, filename, mimeType);
    });
}

export function dataURItoBlob(dataURI: string, filename?: string, mimeType?: string) {

    const base64Data = dataURI.replace(/^data:[a-zA-Z]*\/[a-zA-Z]*;base64,/, "");
    const binaryData = atob(base64Data);
    const dataArray = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
        dataArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([dataArray.buffer], { type: mimeType });
    const file = new File([blob], filename, { type: mimeType });

    return file;
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

export function formatFileSize(bytes, unit) {
    if (unit === 'KB') return (bytes / 1024).toFixed(2);
    else if (unit === 'MB') return (bytes / 1048576).toFixed(2);
    else return bytes;
}