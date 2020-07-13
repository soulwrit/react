import '@writ/scss/components/toolbar.scss'
import React from 'react';
import classnames from 'classnames';
import { Flex, FlexItem } from './Flex';
import { ReactComponent as IconList } from './ToolBar/List.svg';
import { ReactComponent as IconIndent } from './ToolBar/Indent.svg';
import { ReactComponent as IconOutdent } from './ToolBar/Outdent.svg';

export const ToolBar = props => {
    const { children } = props;

    return React.createElement(Flex,
        {
            className: classnames('tbar'),
        },
        React.createElement(FlexItem, {
            className: 'trigger'
        }, React.createElement(IconIndent, {
            className: 'svgico x1'
        })),
        React.createElement(FlexItem, null, children),
        React.createElement(FlexItem, null, 'Extra'),
    );
}