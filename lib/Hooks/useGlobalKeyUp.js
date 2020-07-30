import { useEffect } from 'react';
export const useGlobalKeyUp = (onHandle, mounted, unmount) => {
    useEffect(() => {
        const onKeyUp = e => {
            onHandle(e);
        };

        typeof mounted === 'function' && mounted();
        typeof onHandle === 'function' && document.addEventListener('keyup', onKeyUp);

        return () => {
            typeof unmount === 'function' && unmount();
            typeof onHandle === 'function' && document.removeEventListener('keyup', onKeyUp);
        };
    }, []);
}