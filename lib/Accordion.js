import '@writ/scss/components/accordion.scss';
import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';
import assert from '@writ/utils/assert';
export { Accordion };

const Item = props => {
   const { children, className, value, expanded, bodyStyle, headStyle, dref, onExpand, style } = props;

   return React.createElement('div', {
      className: classnames('i', className),
      children: [
         React.createElement('div', {
            key: 0,
            className: 'hd',
            children: value,
            style: headStyle,
         }),
         React.createElement('div', {
            key: 1,
            className: 'bd',
            children,
            style: CSSUtil.show(expanded || false, bodyStyle)
         }),
      ],
      onClick: onExpand,
      ref: dref,
      style,
   });
};

const Accordion = props => {
   const { active, children, className, dref, multiple, onChange, style } = props;
   const [expanded, setExpanded] = useState(active);

   return React.createElement('div', {
      className: classnames(CSSUtil.accordion, className),
      children: React.Children.map(children, (C, key) => {
         assert.truly(C && C.type === Item, 'Only `Accordion.Item` used in `Accordion`.');

         const value = C.props.value;
         const index = expanded.indexOf(key);
         const actived = index > -1;
         const onExpand = e => {
            let values = expanded;
            if (e) e.stopPropagation();

            if (multiple) {
               actived ? values.splice(index, 1) : values.push(key);
               values = [].concat(values);
            } else {
               values = actived ? [] : [key];
            }

            setExpanded(values);
            onChange && onChange(key, values);
         };

         return React.cloneElement(C, {
            key,
            expanded: actived,
            value: typeof value === 'function' ? value(actived, onExpand) : value,
            onExpand: typeof value !== 'function' ? onExpand : null
         });
      }),
      ref: dref,
      style,
   });
};

Accordion.Item = Item;
Accordion.defaultProps = {
   multiple: true,
   active: []
};

if (window.DEV) {
   Item.propTypes = {
      bodyStyle: PropTypes.object,
      headStyle: PropTypes.object,
      expanded: PropTypes.bool,
      value: PropTypes.any,
      dref: PropTypes.func
   };
   Accordion.propTypes = {
      onChange: PropTypes.func,
      multiple: PropTypes.bool,
      active: PropTypes.array,
      dref: PropTypes.func
   };
}