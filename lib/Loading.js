import '@writ/scss/components/loading.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import trackball from '@writ/utils/canvas-spin-track-ball';
import sunflower from '@writ/utils/canvas-spin-sunflower';
import { CSSUtil } from '../dependency';

export class Loading extends React.Component {
   componentDidMount() {
      if (this.cvs) {
         this.clean = { 1: trackball, 2: sunflower }[this.props.type](this.cvs, this.props);
      }
   }
   componentWillUnmount() {
      if (this.clean) this.clean();
   }
   render() {
      let children;
      switch (this.props.type) {
         case 1:
         case 2:
            children = [
               React.createElement('canvas', {
                  ref: el => this.cvs = el,
                  key: 0,
                  className: 'cvs'
               }),
               React.createElement(React.Fragment, {
                  key: 1,
                  children: this.props.value || this.props.children
               })
            ];
            break;
         case 0:
            children = React.createElement('div', {
               children: this.props.value || this.props.children,
               className: 'txt'
            });
         default: break;
      }

      return React.createElement('div', {
         className: classnames(CSSUtil.loading, this.props.className),
         children: children,
         style: this.props.style
      });
   }
}

Loading.defaultProps = {
   value: 'loading ... ',
   // error: 'Sorry, there was a problem loading the page.',
   type: 0
}

if (window.DEV) {
   Loading.propTypes = {
      value: PropTypes.any,
      // error: PropTypes.any,
      type: PropTypes.number,
   };
}