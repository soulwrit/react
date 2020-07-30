import { useState, useEffect } from 'react';
export const useImage = (src, defaultSrc, errorSrc, onError) => {
    const [img, setImg] = useState(defaultSrc);

    useEffect(() => {
        if (src == null) return;

        const image = new Image();
        image.onload = () => {
            setImg(src);
            image.onerror = image.onload = null;
        };
        image.onerror = () => {
            setImg(errorSrc || defaultSrc);
            onError && onError(new Error(`Image(${src}) Not Found.`));
        };
        image.src = src;
    }, [src]);

    return [img, setImg];
}