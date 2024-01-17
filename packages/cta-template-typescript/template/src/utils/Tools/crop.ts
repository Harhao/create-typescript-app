export type IResizeReturn  = {
    pixelData: ImageData;
    base64Url: string;
};


export const resizeImage = (src: string, imageType: string, maxSize: number = 1024): Promise<IResizeReturn> => {
    return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.onload = async function () {
            console.log('image origin width and height', image.width, image.height);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxDimension = Math.max(image.width, image.height);

            let scaleFactor = 1;

            let newWidth = image.width;
            let newHeight = image.height;

            if (maxDimension > maxSize) {
                scaleFactor = maxSize / maxDimension;
                newWidth = image.width * scaleFactor;
                newHeight = image.height * scaleFactor;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx.drawImage(image, 0, 0, image.width, image.height,  0, 0, newWidth, newHeight);

            const pixelData = ctx.getImageData(0, 0, newWidth, newHeight);

            const base64Url = canvas.toDataURL(imageType, 0.8);


            resolve({
                pixelData,
                base64Url,
            });
        }
    })
}