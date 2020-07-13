import assert from '@writ/utils/assert';
import { CSSUtil } from '../../dependency';

const cached = new Map();
export function createContainer(position) {
    if (cached.has(position)) {
        return cached.get(position);
    }
    const container = document.createElement('div');
    const bridge = Object.create(null);
    container.className = [CSSUtil.toast, position].join(' ');
    document.body.appendChild(container);
    cached.set(position, [container, bridge]);

    return [container, bridge];
}
export function destroyContainer() {
    cached.forEach(([container], position) => {
        document.body.removeChild(container);
        cached.delete(position);
    });
}
export function removeContainer(position) {
    if (cached.has(position)) {
        const [container, bridge] = cached.get(position);

        document.body.removeChild(container);
        bridge.instance = null;
        return cached.delete(position);
    }

    assert.throw('Container does existed, or has be removed.');
}