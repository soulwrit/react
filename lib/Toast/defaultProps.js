import noop from '@writ/utils/noop';
import hasOwn from '@writ/utils/object-has-own';
import { MQ_Breakpoints } from '../../dependency';
export const position = [
    'top-start', 'top', 'top-end',
    // 'right', 'left', 'middle', 'fade',
    'bottom-start', 'bottom', 'bottom-end',
];
export const checkPosition = value => {
    return position.includes(value);
};
export const DEFAULT = {
    autoClose: true,
    duration: 2000,
    onClose: noop,
    position: 'top-end',
    size: 'md',
    space: 16,
    type: 'error',
    value: 'message',
};
export const mergeProps = (options, targetObj, hasDefault) => {
    const target = targetObj || DEFAULT;

    switch (typeof options) {
        case 'function':
            target.onClose = options;
            break;
        case 'number':
            target.duration = options;
            break;
        case 'string': {
            if (MQ_Breakpoints.includes(options)) {
                target.size = options;
                break;
            }
            target.position = options;
            break;
        }
        case 'object': {
            for (const key in options) {
                if (DEFAULT.hasOwnProperty(key) && typeof options[key] !== 'undefined') {
                    target[key] = options[key];
                }
            }
        }
        default: break
    }

    if (hasDefault) { 
        for (const key in DEFAULT) {
            if (!hasOwn(target, key) || typeof target[key] === 'undefined') {
                target[key] = DEFAULT[key];
            }
        }
    }

    return target;
};