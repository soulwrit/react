import ReactDOM from 'react-dom';
import assert from '@writ/utils/assert';

export function mount(element, callback) {
    const dDiv = document.createElement('div');

    document.body.append(dDiv);
    ReactDOM.render(element, dDiv, () => {
        typeof callback === 'function' && callback(dDiv);
    });

    return function () {
        unmount(dDiv);
    };
}

export function unmount(container, isDeleteContainer) {
    const isUnmounted = ReactDOM.unmountComponentAtNode(container);

    if (isUnmounted === false) {
        assert.report(new Error('Failed to unload element from specified node'));
    }
    if (isDeleteContainer === false) {
        return;
    }
    try {
        document.body.removeChild(container);
    } catch (error) {

    }
}