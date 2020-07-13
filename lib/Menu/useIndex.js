import { useState, useEffect } from 'react';
export default function useIndex(initial, updated) {
    const [mount, setMount] = useState(false);
    const [index, setIndex] = useState(initial);
    const wrapperSetIndex = (i, callback) => {
        setIndex(i);
        typeof callback === 'function' && callback(index);
    };

    useEffect(() => {
        setMount(true);
    }, [mount]);

    useEffect(() => {
        mount && typeof updated === 'function' && updated(index);
    }, [index]);

    return [index, wrapperSetIndex];
}
