import '@writ/scss/components/table.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';

export function Column() {
   return null;
}

Column.defaultProps = {
   /**
    * 
    * @param {Object} data 
    * @param {String} key  
    */
   render(data, key) {
      return data[key];
   },
};

Column.propTypes = {
   render: PropTypes.func.isRequired
};

/**
 * 表头数据渲染
 * @param {Table.defaultProps} props 
 */
function theadRender(props) {
   const { columns } = props;

   return columns.map(({ key, value, render, children, ...props }) => {
      return React.createElement('th', {
         ...props,
         key,
         children: typeof render === 'function' ? (render(key, value) || value) : value,
      })
   });
}

/**
 * 表格数据渲染
 * @param {Table.defaultProps} props 
 */
function sourceRender(props) {
   const { source, children, columns } = props;
   const hasChildren = children != null;

   return source.map((data, dataIndex) => (
      React.createElement('tr', {
         key: dataIndex,
         children: columns.map(({ key }, columnIndex) => {
            const _Column = hasChildren && children[columnIndex] || React.createElement(Column);

            if (_Column.type !== Column) {
               throw new Error('Table.Child must be a `Table.Column`.');
            }
            const { render, className, ...columnProps } = _Column.props;

            return React.createElement('td', {
               key: columnIndex,
               children: render(data, key),
               className:
                  typeof className === 'function'
                     ? className(dataIndex, columnIndex)
                     : className,
               style: columnProps.style,
               colSpan: columnProps.colspan
            });
         })
      })
   ));
}

/**
 * 表格数据渲染
 * @param {Table.defaultProps} props 
 */
function emptyRender(props) {
   const { placeholder, placeholderClassName, columns } = props;

   return (
      <tr>
         <td colSpan={columns.length} className={placeholderClassName}>
            {placeholder}
         </td>
      </tr>
   );
}

export class Table extends React.Component {
   static Column = Column;
   static defaultProps = {
      columns: [],
      source: [],
      title: undefined,
      extra: null,
      placeholder: '亲，暂无数据~~~',
      placeholderClassName: 'tac',
   }

   render() {
      const { title, className, extra, source, tighten, hover, striped, bordered, fixed } = this.props;

      return (
         <div className={CSSUtil.table}>
            <table className={[className, tighten ? 'tighten' : undefined, hover ? 'hover' : undefined, striped ? 'striped' : undefined, bordered ? 'bordered' : '', fixed ? 'fixed' : ''].join(' ')}>
               {title && <caption>{title}</caption>}
               <thead>
                  <tr>
                     {theadRender(this.props)}
                  </tr>
               </thead>
               <tbody>
                  {source.length ? sourceRender(this.props) : emptyRender(this.props)}
               </tbody>
            </table>
            {extra}
         </div>
      );
   }
}

if (true) {
   Table.propTypes = {
      source: PropTypes.array.isRequired,
      columns: PropTypes.arrayOf(PropTypes.shape({
         key: PropTypes.string.isRequired,
         value: PropTypes.string.isRequired,
         render: PropTypes.func
      })).isRequired,
      title: PropTypes.string,
      extra: PropTypes.element,
      placeholder: PropTypes.any,
      placeholderClassName: PropTypes.string,
      tighten: PropTypes.bool,
      hover: PropTypes.bool,
      striped: PropTypes.bool,
      bordered: PropTypes.bool,
      fixed: PropTypes.bool
   }
}