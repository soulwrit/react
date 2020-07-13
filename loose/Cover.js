import '../../scss/components/cover.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { percentage } from './util/percentage';
import { CSSUtil } from '../dependency';
import holdImage from './Common/HoldImage';

export class Cover extends React.PureComponent {
   static getDerivedStateFromProps(nextProps) {
      if ('src' in nextProps) {
         return {
            src: nextProps.src
         };
      }

      return null;
   }
   constructor(props) {
      super();
      this.state = {
         src: props.src
      };
   }
   componentDidMount() {
      this.load(this.props.src);
   }
   load(src) {
      if (src === holdImage || src == null) {
         return;
      }
      const image = new Image();

      image.onload = () => {
         this.setState({ src }, () => {
            image.onerror = image.onload = null;
         });
      };
      image.onerror = () => {
         this.setState({ src: holdImage }, () => {
            if (this.props.onError) {
               this.props.onError();
            }
         });
      };
      image.src = src;
   }
   render() {
      const { className, ratio, style, width, height, bgSize, children, title, alt } = this.props;
      const src = this.state.src;
      const props = ratio > 0 ? {
         children,
         className: classnames(CSSUtil.cover, 'ratio', className),
         style: Object.assign({
            paddingBottom: percentage(ratio),
            backgroundImage: `url("${src ? src : holdImage}")`,
            backgroundSize: bgSize
         }, style),
         title,
      } : {
            children: React.createElement('img', { src, alt }),
            className: classnames(CSSUtil.cover, className),
            style: Object.assign({ width, height }, style)
         };

      return React.createElement('div', props);
   }
}

Cover.defaultProps = {
   src: holdImage
};

if (window.DEV) {
   Cover.propTypes = {
      src: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      ratio: PropTypes.number,
      onError: PropTypes.func,
      bgSize: PropTypes.string
   };
}