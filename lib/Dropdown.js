import '@writ/scss/components/dropdown.scss';
import React, { isValidElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import assert from '@writ/utils/assert';
import hasOwn from '@writ/utils/object-has-own';
import { CSSUtil } from '../dependency';
import { Trigger } from './Common/Trigger';
import { Group } from './Dropdown/Group';
import { Head } from './Dropdown/Head';
import { Item } from './Dropdown/Item';
import { getPosition } from './Dropdown/getPosition';
import { getZIndex } from './Common/zIndex';
export const DropdownHead = Head;
export const DropdownItem = Item;
export const DropdownGroup = Group;
export class Dropdown extends React.Component {
   constructor() {
      super();
      this.state = {
         selected: []
      };
   }
   getPos = (pRect, lRect) => {
      return getPosition(pRect, lRect, this.props);
   }
   mapDropList(array, serial, action) {
      const { multiple, onChange, selectable } = this.props;
      const { selected } = this.state;

      return array.map((child, index) => {
         assert.nuil(child, 'Invalid `Dropdown.Item`.');

         switch (child.type) {
            case Item:
               const key = serial + '.' + index;
               const { className, onClick, value } = child.props;

               return React.cloneElement(child, {
                  key: index,
                  className: classnames(
                     className,
                     selectable ? { active: hasOwn(selected, key) } : null
                  ),
                  onClick: e => {
                     e.stopPropagation();
                     if (selectable) {
                        let tmp = Object.assign({}, selected);

                        if (multiple) {
                           tmp[key] = value;
                        } else {
                           tmp = { [key]: value };
                        }

                        this.setState({ selected: tmp });
                     }

                     if (typeof onClick === 'function') {
                        onClick(key, value);
                     }
                     onChange(e);
                     action.close();
                  }
               });
            case Group:
               serial++;
               return React.cloneElement(child, {
                  key: index,
                  children: this.mapDropList(React.Children.toArray(child.props.children), serial, action)
               });
            default:
               assert.throw('Only `Group` or `Item` can used `Dropdown`.');
               break;
         }
      });
   }
   parseChildren() {
      const { children, head } = this.props;
      let _Head = head;
      let _Body = [];

      React.Children.forEach(children, child => {
         if (!React.isValidElement(child)) return child;
         switch (child.type) {
            case Head:
               _Head = child;
               break;
            case Item:
            case Group:
               _Body.push(child);
               break;
            default: break;
         }
      });

      return [_Head, _Body];
   }
   getHeader(node, props) {
      if (isValidElement(node) && node.type === Head) {
         return React.cloneElement(node, props);
      }

      return React.createElement(Head, props, node);
   }
   render() {
      const {
         calc, className, clickable,
         hoverable, style,

         // 传递给 Trigger 的 props
         closeOnEsc, closeOnOutsideClick, container,
         disabled, escape,
         onClose, onKeyUp, onOpen, onResize,
         resetOnTopResize,
         visible
      } = this.props;
      const calcCoord = calc || this.getPos;
      const [_Head, _Body] = this.parseChildren();

      return React.createElement(Trigger, {
         closeOnEsc, closeOnOutsideClick,
         disabled, escape, onClose, onKeyUp, onOpen, onResize,
         resetOnTopResize, calcCoord, visible,
      }, action => {
         const { coord, layer, trigger, open, close, visible } = action;

         return React.createElement(React.Fragment, null,
            this.getHeader(_Head, {
               clickable,
               hoverable,
               onClick: open,
               onMouseEnter: hoverable ? open : null,
               ref: trigger,
            }),
            ReactDOM.createPortal(
               React.createElement('div', {
                  className: classnames(CSSUtil.dropdown, {
                     non: !visible
                  }, className),
                  onMouseLeave: hoverable ? close : null,
                  ref: layer,
                  style: visible ? Object.assign({
                     zIndex: getZIndex()
                  }, style, coord) : null,
               }, this.mapDropList(_Body, 0, action)),
               container),
         );
      });
   }
};
Dropdown.Head = Head;
Dropdown.Item = Item;
Dropdown.Group = Group;
Dropdown.defaultProps = {
   clickable: true,
   container: document.body,
   multiple: false,
   onChange: noop,
   space: 10
};
if (window.DEV) {
   Dropdown.propTypes = {
      clickable: PropTypes.bool,
      head: PropTypes.any,
      hoverable: PropTypes.bool,
      multiple: PropTypes.bool,
      onChange: PropTypes.func,
      selectable: PropTypes.bool,
      space: PropTypes.number,
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
      visible: PropTypes.bool,
   };
}