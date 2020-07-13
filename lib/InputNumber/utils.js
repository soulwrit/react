export const minus = '-';
export const dot = '.';
export const minusDot = '-.';
export const isMinusSign = char => {
    return char === '-';
};
export const isDot = char => {
    return char === '.' || char === '。';
};
export const getDot = char => {
    return isDot(char) ? '.' : '';
};
export const getDotIndex = str => {
    return str.indexOf(dot);
};
export const fixDotStart = str => {
    return str.startsWith(dot) ? '0'.concat(str) : str;
}
export const fixMinusDotStart = str => {
    return str.startsWith(minusDot) ? '-0'.concat(str.substr(1)) : str;
}
export const formatNumber = (numeric, fmt) => {
    if (typeof fmt !== 'string' || !fmt.trim()) return numeric;
    const regex = /\{(.+?)\}/g;
    const strNum = numeric.toString();
    let match, len = 0, ret = fmt;

    while (match = regex.exec(fmt)) {
        let temp = match[0];
        let meta = match[1];
        if (meta == null) {
            continue;
        }
        let [start, end] = meta.split(',').map(value => !value ? 0 : value);

        if (end == null) {
            end = start;
            start = len;
            len = end - start;
        }

        let substr = strNum.substr(start, end);
        ret = ret.replace(temp, substr);
    }

    return ret;
}

export const longPressStart = (e, callback) => {
    e.preventDefault();

    var timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        callback();
    }, 600);
}
export const longPressEnd = (e, timer, callback) => {
    e.preventDefault();
    clearTimeout(timer);
    callback(timer);
}