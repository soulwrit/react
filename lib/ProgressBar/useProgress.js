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

// export const useBackState = (initial, callback) => {
//     const [state, setState] = useState(initial);
//     const setStateWrapper = (nextState, callback) => {
//         if (typeof callback === 'function') {
//             // prev state
//             if (callback(state, nextState) === false) {
//                 return;
//             }
//         }

//         setState(nextState);
//     };

//     useEffect(() => {
//         if (typeof callback === 'function') {
//             callback(state);
//         }
//     }, [state]);

//     return [state, setStateWrapper];
// }