import { useState, useEffect } from 'react';

export const useProgress = (initial, callback) => {
    const [progress, setProgress] = useState(initial);
    const setProgressWrapper = (newValue, callback) => {
        if (typeof callback === 'function') {
            callback(progress);
        }

        setProgress(newValue);
    };

    useEffect(() => {
        if (typeof callback === 'function') {
            callback(progress);
        }
    }, [progress]);

    return [progress, setProgressWrapper];
}