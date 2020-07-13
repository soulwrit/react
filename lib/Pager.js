import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '@writ/scss/components/pager.scss';
import noop from '@writ/utils/noop';
import { CSSUtil } from '../dependency';

export class Pager extends React.PureComponent {
   onJump = no => {
      return e => {
         const { onChange, pageNo, pageSize } = this.props;
         let currentPageNo = pageNo;

         e.stopPropagation();
         switch (no) {
            case 'prev':
               --currentPageNo;
               break;
            case 'next':
               ++currentPageNo;
               break;
            default:
               currentPageNo = no;
               break;
         }

         onChange(currentPageNo, pageSize);
      }
   }

   getItem(num, text, kind) {
      const { itemRender, pageNo, pageSize, total, } = this.props;
      const pageTotal = Math.ceil(total / pageSize);

      return React.createElement('li', {
         key: num,
         className: classnames(
            'i', kind,
            (pageNo === num ? 'active' : undefined),
            (num === 'prev' && pageNo <= 1 || num === 'next' && pageNo >= pageTotal ? 'disabled' : undefined)
         ),
         onClick: this.onJump(num),
         children: itemRender(num, text || num) || text || num
      });
   }

   // 生成页码
   generateItems() {
      const { omit, pageNo, pageSize, total } = this.props;
      const pageTotal = Math.ceil(total / pageSize);
      const pages = [];

      if (pageTotal <= 7) {
         for (let i = 1; i <= pageTotal; i++) {
            pages[i] = this.getItem(i);
         }
      } else {
         let loopStart, loopEnd;

         if (pageNo > pageTotal - 5) {
            loopEnd = pageTotal;
            loopStart = loopEnd - 5;
         } else if (pageNo <= 4) {
            loopStart = 1;
            loopEnd = loopStart + 4;
         } else {
            loopStart = pageNo - 2;
            loopEnd = pageNo + 2;
         }

         if (pageNo >= 5) {
            pages.push(
               this.getItem(1),
               this.getItem('prev', omit)
            );
         }

         for (let i = loopStart; i <= loopEnd; i++) {
            pages[i] = this.getItem(i);
         }

         if (pageNo <= pageTotal - 5) {
            pages.push(
               this.getItem('next', omit),
               this.getItem(pageTotal)
            );
         }
      }

      return pages;
   }

   render() {
      const { className, prev, next, children, listClassNmae, listStyle, prep, style, } = this.props;

      return React.createElement('div',
         {
            className: classnames(CSSUtil.pager, className),
            style,
         },
         prep,
         React.createElement('ul',
            {
               style: listStyle,
               className: listClassNmae
            },
            this.getItem('prev', prev, 'prev'),
            this.generateItems(),
            this.getItem('next', next, 'next')
         ),
         children
      );
   }
}

Pager.defaultProps = {
   total: 0, // 数据总数
   pageNo: 1, // 当前页面数
   pageSize: 20, // 每页多少条
   omit: '•••', // 忽略占位符
   prev: '<',   //上一页的图标 
   next: '>', // 下一页的图标
   onChange: noop, // 页码发生变化时使用
   itemRender: noop, // 自定义页面渲染函数
   prep: null, // 前置给分页器的内容
}
if (window.DEV) {
   Pager.propTypes = {
      total: PropTypes.number.isRequired,
      pageNo: PropTypes.number.isRequired,
      pageSize: PropTypes.number,
      omit: PropTypes.any,
      prev: PropTypes.any,
      next: PropTypes.any,
      onChange: PropTypes.func.isRequired,
      itemRender: PropTypes.func,
      prep: PropTypes.element
   };
}