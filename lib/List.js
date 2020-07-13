import '@writ/scss/components/list.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil } from '../dependency';
export { List };

function throwError() {
    throw new Error('Only `List.Item`, `List.Head`, `List.Foot` used in `List`.');
}
function Head(props) {
    const { value, children, className, ...rest } = props;

    return React.createElement('li', {
        className: classnames('fst', className),
        children: value || children,
        ...rest
    });
}
function Foot(props) {
    const { value, children, className, ...rest } = props;

    return React.createElement('li', {
        className: classnames('lst', className),
        children: value || children,
        ...rest
    });
}
function Item(props) {
    const { value, children, ...rest } = props;

    return React.createElement('li', {
        children: value || children,
        ...rest
    });
}
function List(props) {
    const { children, className, type, ...rest } = props;
    const lastIndex = React.Children.count(children) - 1;

    return React.createElement(type, {
        className: classnames(CSSUtil.list, type, className),
        children: React.Children.map(children, (Child, index) => {
            if (!Child) return throwError();

            switch (Child.type) {
                case Head: {
                    return index === 0
                        ? React.cloneElement(Child, {
                            key: index,
                        }) : null;
                }
                case Foot: {
                    return index === lastIndex
                        ? React.cloneElement(Child, {
                            key: index,
                        }) : null;
                }
                case Item: {
                    return React.cloneElement(Child, {
                        key: index,
                    });
                }
                default: break;
            }
            throwError();
        }),
        ...rest
    });
}
List.Item = Item;
List.Head = Head;
List.Foot = Foot;
List.defaultProps = {
    type: 'ol',
};
List.propTypes = {
    type: PropTypes.oneOf(['ol', 'ul']),
};