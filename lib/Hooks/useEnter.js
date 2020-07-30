import { useEffect } from 'react';
export const useEnter = (onHandle, depends) => {
    useEffect(() => {
        const onKeyUp = e => {
            if (e.keyCode === 13) {
                onHandle();
            }
        };

        typeof onHandle === 'function' && document.addEventListener('keyup', onKeyUp);
        return () => {
            typeof onHandle === 'function' && document.removeEventListener('keyup', onKeyUp);
        };
    }, depends);
}