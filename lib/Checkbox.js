import '@writ/scss/components/checkbox.scss';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import { Model } from './Form/model';
import { CSSUtil } from '../dependency';
export { Checkbox };

const Group = props => {
   const { active, children, model, onChange } = props;
   const [checked, setChecked] = useState(active);

   if (model) {
      model.dispatch = setChecked;
   }

   return React.Children.map(children, (Item, index) => {
      if (Item.type !== Checkbox) {
         throw new Error('Only `Checkbox` used in `Checkbox.Group`.');
      }
      const name = Item.props.name;
      const mark = !!name ? name : index;
      const idx = checked.indexOf(mark);

      return React.cloneElement(Item, {
         key: index,
         checked: idx > -1,
         onChange: status => {
            const values = [].concat(checked);

            status ? values.push(mark) : values.splice(idx, 1);
            if (model) {
               model.value = values;
            } else {
               setChecked(values);
            }

            onChange && onChange(values);
         }
      });
   });
};

const Checkbox = props => {
   const { name, value, disabled, dref, children, useLabel, onChange, checked, style } = props;
   const [status, setStatus] = useState(checked);
   const ref = useRef(dref);
   const handleChange = e => {
      const active = e.target.checked;
      e.stopPropagation();
      setStatus(active);
      onChange && onChange(active);
   };
   const handleClick = e => {
      e.stopPropagation();
      ref.current.click();
   };

   return React.createElement(useLabel ? 'label' : 'span',
      {
         className: classnames(CSSUtil.checkbox, CSSUtil.disable(disabled), CSSUtil.check(status)),
         style,
      },
      React.createElement('input', {
         type: "checkbox",
         name,
         disabled,
         defaultChecked: status,
         onChange: handleChange,
         ref
      }),
      React.createElement('span', {
         className: 'state',
         onClick: !useLabel ? handleClick : null
      }),
      (value || children) && React.createElement('span', { className: 'value' }, value || children),
   );
};

Checkbox.Group = Group;
Checkbox.defaultProps = {
   onChange: noop,
};
Group.defaultProps = {
   onChange: noop,
   active: []
};

if (window.DEV) {
   Checkbox.propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.any,
      disabled: PropTypes.bool,
      dref: PropTypes.func,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      style: PropTypes.object,
      value: PropTypes.any,
      useLabel: PropTypes.bool,
   };
   Group.propTypes = {
      active: PropTypes.array,
      children: PropTypes.element,
      model: PropTypes.instanceOf(Model),
      onChange: PropTypes.func,
   };
}