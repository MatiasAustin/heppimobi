
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // to avoid CORS issues when drawing to canvas
        image.src = url;
    });

/**
 * Gets the cropped image as a base64 string
 */
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    quality: number = 0.8
): Promise<string | null> {
    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        // Set dimensions for the cropped image
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // Draw the cropped portion of the source image onto the canvas
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        // Convert the canvas to a base64 string
        return canvas.toDataURL('image/jpeg', quality);
    } catch (e) {
        console.error('Error cropping image:', e);
        return null;
    }
}
