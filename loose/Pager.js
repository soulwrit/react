import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '@writ/scss/components/pager.scss';
import noop from '@writ/utils/noop';
import { CSSUtil } from '../dependency';


export class Pager extends React.Component {
   constructor(props) {
      super();
      this.pageNo = props.pageNo || 1;
      this.pageSize = props.pageSize;
   }

   handleJump = no => {
      return () => {
         switch (no) {
            case 'prev':
               --this.pageNo;
               break;
            case 'next':
               ++this.pageNo;
               break;
            default:
               this.pageNo = no;
               break;
         }
         this.props.onChange(this.pageNo, this.pageSize);
      }
   }

   getPageItem(num, text, kind) {
      return React.createElement('li', {
         key: num,
         className: classnames(
            'item', kind,
            (this.pageNo === num ? 'active' : undefined),
            (num === 'prev' && this.pageNo <= 1 || num === 'next' && this.pageNo >= this.props.total ? 'disabled' : undefined)
         ),
         onClick: this.handleJump(num),
         children: this.props.itemRender(num, text || num) || text || num
      });
   }

   // 生成页码
   generatePages() {
      const { pageNo } = this;
      const { omit, total } = this.props;
      const pages = [];

      if (total <= 7) {
         for (let i = 1; i <= total; i++) {
            pages[i] = this.getPageItem(i);
         }
      } else {
         let loopStart, loopEnd;

         if (pageNo > total - 5) {
            loopEnd = total;
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
               this.getPageItem(1),
               this.getPageItem('prev', omit)
            );
         }

         for (let i = loopStart; i <= loopEnd; i++) {
            pages[i] = this.getPageItem(i);
         }

         if (pageNo <= total - 5) {
            pages.push(
               this.getPageItem('next', omit),
               this.getPageItem(total)
            );
         }
      }

      return pages;
   }

   render() {
      const { className, prev, next, children, prep, style } = this.props;

      return (
         <div className='warper' style={style}>
            {prep}
            <ul className={classnames(CSSUtil.pager, className)}>
               {this.getPageItem('prev', prev, 'prev')}
               {this.generatePages()}
               {this.getPageItem('next', next, 'next')}
            </ul>
            {children}
         </div>
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
      onChange: PropTypes.func,
      itemRender: PropTypes.func,
      prep: PropTypes.element
   };
}