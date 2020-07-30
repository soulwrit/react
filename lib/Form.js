import '@writ/scss/components/form.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil, dirs } from '../dependency';
import { Model } from './Form/Model';
import { Creator } from './Form/Creator';
import { Item } from './Form/Item';
export { Form, create };

function Form(props) {
   const { className, children, labelClassName, mainClassName, dir, onSubmit, isRow, ...rest } = props;

   return React.createElement('form', {
      className: classnames(CSSUtil.form, className, isRow ? CSSUtil.row : undefined),
      children: React.Children.map(children, (Child, index) => {
         if (Child.type === Item) {
            const props = Child.props;

            return React.cloneElement(Child, {
               key: index,
               dir: props.dir || dir,
               className: classnames(
                  isRow ? CSSUtil.join(CSSUtil.col, props.span || 12) : undefined,
                  props.className
               ),
               labelClassName: classnames(labelClassName, props.labelClassName),
               mainClassName: classnames(mainClassName, props.mainClassName),
            });
         }

         return Child;
      }),
      onSubmit(e) {
         e.preventDefault();
         if (onSubmit) onSubmit();
         return false;
      },
      ...rest,
   });
}
Form.Item = Item;
Form.create = create;
Form.hoc = hoc;
Form.defaultProps = {
   dir: undefined,
   labelClassName: undefined,
   mainClassName: undefined,
   title: undefined,
   onSubmit: undefined,
   isRow: false
};
Form.propTypes = {
   dir: PropTypes.oneOf(dirs),
   labelClassName: PropTypes.string,
   mainClassName: PropTypes.string,
   title: PropTypes.string,
   onSubmit: PropTypes.func,
   isRow: PropTypes.bool
};

/**
 * 数据流管理
 * @param {Model} models 字段模型 ...
 * @param {object} values 字段值集合
 * @param {string} formName 表单字段的名称
 * @returns {Creator} 
 */
function create(models, values, formName) {
   return new Creator(models, values, formName);
}

/**
 * 数据流管理
 * @param {Model} models 字段模型
 * @param {object} values 字段值集合
 */
function hoc(models, values) {
   const form = new Creator(models, values);

   return function (Component, props) {
      return React.createElement(Component, Object.assign({
         form
      }, props));
   }
}

