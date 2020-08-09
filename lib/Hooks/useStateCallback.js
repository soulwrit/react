import { useEffect, useEffect } from 'react';
export const useStateCallback = (initial, callback) => {
    const [state, setState] = useState(initial);
    const asyncCallback = useRef();
    const setStateWrapper = (nextState, prev, next) => {
        if (typeof prev === 'function') {
            // prev state
            if (prev(state, nextState) === false) {
                return;
            }
        }

        setState(nextState);
        asyncCallback.current = typeof next === 'function' ? next : null;
    };

    useEffect(() => {
        if (typeof callback === 'function') {
            callback(state);
        }
        if (asyncCallback.current) asyncCallback.current(state);
        return () => {
            asyncCallback.current = null
        }
    }, [state]);

    return [state, setStateWrapper];
}