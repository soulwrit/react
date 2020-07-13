import noop from '@writ/utils/noop';
import assert from '@writ/utils/assert';
export function createManager(change) {
    const stack = [];
    const paths = [];
    const event = {};

    return {
        index: 0,
        get current() {
            return this._current;
        },
        set current(path) {
            if (paths.indexOf(path) === -1) {
                throw new Error('Path does not existed.');
            }
            this.getValidPath(path, {
                string: () => {
                    for (let i = 0, item = stack[i]; !!item; item = stack[i++]) {
                        if (item.path === path) {
                            this.index = i;
                            this._current = item;
                            break;
                        }
                    }
                },
                number: () => {
                    if (path < stack.length) {
                        this.index = path;
                        this._current = stack[path];
                    }
                }
            });
        },
        next(state) {
            this.index++;
            if (this.index > stack.length - 1) {
                return;  // 上边际;
            }
            this.go(this.index, state);
        },
        prev(state) {
            this.index--;
            if (this.index < 0) {
                return;// 下边界
            }
            this.go(this.index, state);
        },
        go(path, state) {
            this.current = path;

            if (this.current) {
                this.current.state = Object.assign({}, this.current.state, state);
                this.emit(this.current.name);
            }
            typeof change === 'function' ? change(this) : console.warn('No via VBM.Provider-onChange listener;');
        },
        /**
         * @param {string}  name 
         * @param {string}  path
         * @param {object}  state
         */
        push(name, path, state) {
            if (paths.indexOf(path) > -1) {
                return;
            }
            assert.truly(!!name && typeof name === 'string', 'namespace’s name must be a valid(not empty) string.');
            assert.truly(typeof path === 'object' && path, 'View must be an object, eg: {path: <String>, state: <Object> }');
            path = this.getValidPath(path);
            stack.push({ name, path, state });
            paths.push(path);
        },
        getValidPath(path, visitor = { string: noop, number: noop }) {
            if (paths.indexOf(paths) > -1) {
                throw new Error('ViewPath already be existed.');
            }
            switch (typeof path) {
                case 'string': visitor.string(path); break;
                case 'number': visitor.number(path); break;
                case 'function':
                    path = path(this);
                    path = this.getValidPath(path);
                default: {
                    throw new Error('InvalidViewPath - the `path` can be a string or number or a return `number or string` function.');
                }
            }

            return path;
        },
        on(name, listen) {
            assert.truly(!!name && typeof name === 'string', 'Listen-name must be a valid(not empty) string.');
            assert.truly(typeof listen === 'function', 'Listen-handle must a function.');
            event[name] = listen;
        },
        emit(name) {
            typeof event[name] === 'function' && event[name](this);
        },
        off(name) {
            delete event[name];
        }
    };
}