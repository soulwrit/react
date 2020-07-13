import '@writ/scss/components/menu.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import assertFalsly from '@writ/utils/assert-falsly';
import { Flex } from './Flex';
import { MenuItem } from './Menu/Item';
import { LineBar } from './LineBar';

import { theme, CSSUtil, dirs, } from '../dependency';
export { Menu, MenuItem };

const getLineBarDir = dir => {
   return dir === 'ttr' || dir === 'rtt' ? 'ltr' : 'ttr';
}
class Menu extends React.PureComponent {
   constructor(props) {
      super();
      this.state = {
         index: props.index || props.activeIndex,
         activedNode: null
      };
      this.items = {};
   }
   setIndex(index) {
      this.setState({ index }, () => {
         var onChange = this.props.onChange;

         if (onChange) onChange(index);
      });
   }
   getLineBarElement(isOpen, dir, size) {
      const { lineBarColor, lineBarDir } = this.props;
      const activedNode = this.state.activedNode;

      return isOpen && activedNode ? React.createElement(LineBar, {
         color: lineBarColor,
         dir: lineBarDir ? lineBarDir : getLineBarDir(dir),
         size,
         target: activedNode,
      }) : null;
   }
   getOverflowElement() {
      return null;
   }
   render() {
      const { activeClassName, className, children, dir, lineBar, lineBarSize, lineHeight, style, theme, } = this.props;
      const activeIndex = this.state.index;

      return React.createElement(Flex, {
         className: classnames(CSSUtil.menu, dir, theme, className),
         style: Object.assign({
            lineHeight
         }, style),
      }, React.Children.map(children, (child, idx) => {
         assertFalsly(child, '`Menu` Contains valid elements.');
         assertFalsly(child.type === MenuItem, 'Only `MemuItem` can be used in `Menu`.');
         const index = child.key || idx;
         const isActived = activeIndex == index; 

         return React.cloneElement(child, {
            active: isActived,
            activeClassName,
            key: index,
            onClick: e => {
               e.preventDefault();
               e.stopPropagation();
               this.setIndex(index);
            },
            // onMouseEnter: e => {

            // },
            // onMouseLeave: e => {

            // },
            ref: instance => {
               if (isActived) {
                  this.setState({ activedNode: instance });
               }
            }
         });
      }), this.getLineBarElement(lineBar, dir, lineBarSize),
         this.getOverflowElement());
   }
}

Menu.Item = MenuItem;
Menu.defaultProps = {
   theme: 'primary',
   dir: 'ltr',
   lineBar: true,
}

if (window.DEV) {
   Menu.propTypes = {
      // 默认的展示的菜单项
      index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      // 菜单主题色
      theme: PropTypes.oneOf(theme),
      // 当菜单发生变化时执行
      onChange: PropTypes.func,
      // 显示 line bar 滑动效果
      lineBar: PropTypes.bool,
      lineBarDir: PropTypes.oneOf(dirs),
      lineBarColor: PropTypes.string,
      lineBarSize: PropTypes.number,
      // 
      dir: PropTypes.oneOf(dirs)
   };
}