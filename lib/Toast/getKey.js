export function getKey() {
    let index = 0;
    getKey = function _getKey() {
        return 'toast'.concat(++index);
    }
    return getKey();
};