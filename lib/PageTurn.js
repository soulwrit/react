import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import '@writ/scss/components/pageTurn.scss';
import { CSSUtil } from '../dependency';

export class PageTurn extends React.PureComponent {
   onUp = e => {
      const { onUp, onChange, pageNo, pageSize } = this.props;
      let currentPageNo = pageNo;

      e.stopPropagation();
      --currentPageNo;

      if (currentPageNo <= 1) {
         currentPageNo = 1;
      }
      onUp(currentPageNo, pageSize);
      onChange(currentPageNo, pageSize);
   }
   onDown = e => {
      const { total, onDown, onChange, pageNo, pageSize } = this.props;
      let currentPageNo = pageNo;
      const pageTotal = Math.ceil(total / pageSize);

      e.stopPropagation();
      ++currentPageNo;

      if (currentPageNo >= pageTotal) {
         currentPageNo = pageTotal;
      }
      onDown(currentPageNo, pageSize);
      onChange(currentPageNo, pageSize);
   }
   render() {
      const { className, up, down, children, style, pageNo, pageSize, total } = this.props;
      const pageTotal = Math.ceil(total / pageSize);

      return pageTotal === 0 ? null : React.createElement('div',
         {
            className: classnames('pagt', className),
            style
         },
         React.createElement('span', {
            className: classnames('i', CSSUtil.disable(pageNo === 1)),
            onClick: this.onUp
         }, up),
         React.createElement('span', {
            className: 'txt'
         }, pageNo + '/' + pageTotal),
         React.createElement('span', {
            className: classnames('i', CSSUtil.disable(pageNo === pageTotal || pageTotal === 0)),
            onClick: this.onDown
         }, down),
         children && React.createElement(React.Fragment, null, children)
      );
   }
}

PageTurn.defaultProps = {
   total: 0,      // 数据总数
   pageNo: 1,     // 当前页面数
   pageSize: 20,  // 每页多少条 
   up: '<',       // 向上的图标 
   down: '>',     // 向下的图标
   onUp: noop,    // 向上
   onDown: noop,  // 向下 
   onChange: noop
}
if (window.DEV) {
   PageTurn.propTypes = {
      total: PropTypes.number.isRequired,
      pageNo: PropTypes.number.isRequired,
      pageSize: PropTypes.number,
      up: PropTypes.any,
      down: PropTypes.any,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onChange: PropTypes.func,
   }
}