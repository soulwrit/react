import hasOwn from '@writ/utils/object-has-own';
export function normalize(item, serial) {
    if (item == null) return;
    switch (typeof item) {
        case 'number':
        case 'string':
            return {
                value: item,
                label: item
            };
        case 'object':
            const value = hasOwn(item, 'value') ? item.value : void 0;
            const label = hasOwn(item, 'label') ? item.label : value;

            if (value) {
                return {
                    value,
                    label: label || value
                };
            }
            if (label) {
                return {
                    value: label,
                    label: label
                };
            }
            if (serial != null) {
                return {
                    value: serial,
                    label: label || serial
                };
            }
        default: break;
    }

    return serial != null ? {
        value: serial,
        label: serial
    } : void 0;
}

export function toValue(initial) {
    const tmp = [];
    if (initial == null) return tmp;
    if (Array.isArray(initial)) {
        initial.forEach(obj => {
            const item = normalize(obj);
            if (item) {
                tmp.push(item);
            }
        });
        return tmp;
    }
    const item = normalize(initial);
    if (item) {
        tmp.push(item);
    }

    return tmp;
}

export function inValue(array, value, index) {
    for (let i = 0, item; i < array.length; i++) {
        item = array[i];
        if (item.value === value || item.label === value) {
            return index ? i : true;
        }
    }

    return index ? -1 : false;
}