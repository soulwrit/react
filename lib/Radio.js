import '@writ/scss/components/radio.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil } from '../dependency';
import { Model } from './Form/Model';
export const Radio = React.forwardRef((props, ref) => {
   const { children, checked, disabled, name, model, onChange, readonly, type, value, } = props;
   const isChecked = model ? model.value : checked;

   return React.createElement(type,
      { className: CSSUtil.radio },
      React.createElement('input', {
         className: 'radio',
         checked: isChecked,
         disabled,
         name,
         onChange: e => {
            onChange && onChange(e.target.checked);
         },
         ref,
         readOnly: readonly,
         type: 'radio',
      }),
      React.createElement('span', {
         className: classnames('state', { disabled, readonly })
      }),
      React.createElement('span', {
         className: 'value',
         children: value || children
      }),
   );
});
const Group = props => {
   const { active, children, name, model, checked, onChange } = props;
   const initialChecked = model ? model.value : (active || checked);
   const [checkedIndex, setCheckedIndex] = useState(initialChecked);

   if (model) {
      useEffect(() => {
         const modelDispatch = index => {
            setCheckedIndex(index);
         };
         if (model) {
            model.dispatch = modelDispatch;
         }
         return () => {
            if (model) {
               model.undispatch = modelDispatch;
            }
         };
      }, []);
   }

   return React.Children.map(children, (Item, index) => {
      if (Item.type !== Radio) {
         throw new Error('Only `Radio` used in `Radio.Group`.');
      }
      const isChecked = checkedIndex >= 0
         ? checkedIndex === index
         : !!Item.props.checked;

      return React.cloneElement(Item, {
         name,
         checked: isChecked,
         key: index,
         onChange: () => {
            if (model) {
               model.value = index;
            } else {
               setCheckedIndex(index);
            }
            onChange && onChange(index);
         },
      });
   });
};


Radio.Group = Group;
Radio.defaultProps = {
   type: 'label'
};
if (window.DEV) {
   Radio.propTypes = {
      name: PropTypes.string,
      value: PropTypes.any,
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
      readonly: PropTypes.bool,
      type: PropTypes.string,
   };
   Group.propTypes = {
      active: PropTypes.number,
      checked: PropTypes.number,
      name: PropTypes.string.isRequired,
      model: PropTypes.instanceOf(Model),
      onChange: PropTypes.func,
   };
}