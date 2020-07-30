import normalizeWheel from 'normalize-wheel';
const TYPE = normalizeWheel.getEventType();
export const onMouseWheel = function onMouseWheel(element, callback) {
    function listenWrapper(e) {
        if (typeof callback !== 'function') {
            return;
        }
        // if (e.preventDefault) {
        //     e.preventDefault();
        // } else {
        //     e.returnValue = false;
        // }

        const normalized = normalizeWheel(e);
        callback.apply(this, [normalized, e]);
    }

    element.addEventListener(TYPE, listenWrapper, false);
    return function rmListener() {
        offMouseWheel(element, listenWrapper);
    };
};
export const offMouseWheel = function offMouseWheel(element, callback) {
    element.removeEventListener(TYPE, callback, false);
};