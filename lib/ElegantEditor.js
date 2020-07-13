import '@writ/scss/components/elegantEditor.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assert from '@writ/utils/assert-console';
import arrayEach from '@writ/utils/array-each';

import { Editable } from './Editable';
import { CSSUtil, MQ_Breakpoints, theme } from '../dependency';

class ElegantEditor extends React.Component {
   constructor(props) {
      super();
      this.state = {
         builtIns: null
      };
      this.loadBuiltIns(props.builtInsLoad);
      this.headerRef = null;
      this.editorRef = null;
      this.footerRef = null;
      this.master = {
         refs: {
            header: this.headerRef,
            editor: this.editorRef,
            footer: this.footerRef
         },
         builtIns: this.state.builtIns,
         builtInsLoad: props.builtInsLoad,
         toolbar: props.toolbar,
         iconStyle: props.iconStyle,
      };
   }
   onHeaderRef = element => {
      this.headerRef = element;
   }
   onEditorRef = element => {
      this.editorRef = element;
   }
   onFooterRef = element => {
      this.footerRef = element;
   }
   loadBuiltIns(builtInsLoad) {
      if (builtInsLoad) {
         return import('./ElegantEditor/default').then(res => {
            this.setState({
               builtIns: res.default
            });
         }).catch(err => assert(false, err));
      }
   }
   /**
    * @param {Array} builtIns 
    * @param {Array} toolbar 
    */
   customMade(builtIns, toolbar) {
      if (toolbar.length === 0) return builtIns;
      const results = [];

      toolbar.forEach(function (item) {
         if (!item) {
            return;
         }
         switch (typeof item) {
            case 'string': {
               arrayEach(builtIns, value => {
                  if (value.name === item) {
                     return results.push(value);
                  }
               });
            } break;
            case 'object': {
               let included;
               arrayEach(builtIns, value => {
                  if (item.override && value.name === item.name) {
                     included = true;
                     return results.push(Object.assign(value, item));
                  }
               });
               if (included == null) {
                  results.push(item);
               }
            } break;
            default: break;
         }
      });

      return results;
   }
   getToolbar() {
      let toolbar = this.props.toolbar;

      if (this.props.builtInsLoad) {
         if (!this.state.builtIns) {
            return this.props.builtInsLoading;
         }
         toolbar = this.customMade(this.state.builtIns, toolbar);
      }

      this.master.toolbar = toolbar;
      return toolbar.map((option, index) => {
         return option.visible === false ? null : React.createElement('div', {
            className: classnames('i', option.className, CSSUtil.disable(option.disabled)),
            children: option.view(this.master, option.props) || null,
            key: index,
            ...option.props
         });
      });
   }
   render() {
      const props = this.props;

      return React.createElement('div', {
         className: classnames(CSSUtil.elegantEditor, props.theme, props.className),
         children: [
            React.createElement('div', {
               key: 0,
               className: classnames('hd', props.size),
               children: this.getToolbar(),
               ref: this.onHeaderRef
            }),
            React.createElement(Editable, {
               className: 'bd',
               key: 1,
               onChange: props.onChange,
               onRef: this.onEditorRef,
               size: props.size,
               theme: null,
               value: props.value,
            }),
            props.foot ? React.createElement('div', {
               className: classnames('ft', props.size),
               children: (typeof props.foot === 'function' ? props.foot(this.master) : props.foot) || null,
               key: 2,
               ref: this.onFooterRef
            }) : null
         ],
         style: props.style
      });
   }
}

ElegantEditor.defaultProps = {
   builtInsLoad: true,
   builtInsLoading: '正在加载默认的内置菜单，请稍等 ... ...',
   size: 'md',
   theme: 'muted',
   toolbar: [],
};
if (window.DEV) {
   ElegantEditor.propTypes = {
      builtInsLoad: PropTypes.bool,
      builtInsLoading: PropTypes.any,
      foot: PropTypes.any,
      toolbar: PropTypes.arrayOf(PropTypes.shape([PropTypes.string, {
         disabled: PropTypes.bool,
         name: PropTypes.string.isRequired,
         override: PropTypes.bool,
         view: PropTypes.func.isRequired,
         visible: PropTypes.bool,
      }])),
      size: PropTypes.oneOf(MQ_Breakpoints),
      theme: PropTypes.oneOf(theme),
      iconStyle: PropTypes.object,
   };
}
export {
   ElegantEditor
};