import assert from '@writ/utils/assert';
export function createManager(name, dispatch) {
    const ns = new Namespace(name, dispatch);

    return {
        current: undefined,
        back(state) {
            this.current = ns.prev();
            ns.update(this.current, state);
        },
        go(path, state) {
            if (ns.has(path)) {
                this.current = path;
                ns.update(path, state);
                return;
            }
            assert.throw(`viewBox: viewPath(${path}) does not existed.`);
        },
        push(path, state) {
            ns.update(path, state);
        },
        add(path) {
            ns.push(path);
        },
        set(name, dispatch) {
            ns.set(name, dispatch);
        },
        reset(name, dispatch) {
            ns.reset(name, dispatch);
        },
    };
}

function Namespace(name, dispatch) {
    this.name = name;
    this.dispatch = dispatch;
    this.paths = [];
    this.index = 0;
    // this.set(name, dispatch);
}
Namespace.prototype.has = function hasPath(path) {
    return this.paths.includes(path);
}
Namespace.prototype.push = function pushPath(path) {
    if (this.has(path)) {
        return;
    }
    assert.truly(typeof path === 'string' && path.trim().length > 0, 'InvalidViewPath - the `path` must be a not-empty-string.');
    this.paths.push(path);
}
Namespace.prototype.prev = function prevPath() {
    this.index--;
    if (this.index < 0) {
        this.index = 0;
    }

    return this.paths[this.index];
}
Namespace.prototype.update = function updateView(path, state) {
    this.index = this.paths.indexOf(path);
    if (this.index === -1) {
        this.push(path);
        this.index = this.paths.length - 1;
    }
    this.dispatch(path, state);
}
Namespace.prototype.set = function setUpdate(name, dispatch) {
    assert.truly(!!name && typeof name === 'string', 'box-name must be a valid(not empty) string.');
    assert.truly(typeof dispatch === 'function', 'viewBox update must a function.');
    this.name = name;
    this.dispatch = dispatch;
}
Namespace.prototype.reset = function resetUpdate(name, dispatch) {
    this.set(name, dispatch);
    this.paths = [];
    this.index = 0;
}