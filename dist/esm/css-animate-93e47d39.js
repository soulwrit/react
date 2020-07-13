const hasOwn = Object.prototype.hasOwnProperty;
const esCssPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml', ''];
const esCssPrefix = getEsCssPrefix();
const esPrefix = getEsPrefix();
const cssPrefix = getCssPrefix();
const animation = prefixProperty('animation', esCssPrefix);
const hasAnimation = hasStyleProperty(animation);
const perspective = prefixProperty('perspective', esCssPrefix);
const transform = prefixProperty('transform', esCssPrefix);
const transition = prefixProperty('transition', esCssPrefix);
const hasTransition = hasStyleProperty(transition);
const hasTransform = hasStyleProperty(transform);
const hasPerspective = hasStyleProperty(perspective);
const animationEnd = getEsPrefixEvent('AnimationEnd');
const onAnimationEnd = getEventEmitter(animationEnd);
const animationStart = getEsPrefixEvent('AnimationStart');
const transitionEnd = getEsPrefixEvent('TransitionEnd');
const onTransitionEnd = getEventEmitter(transitionEnd);
const transitionStart = getEsPrefixEvent('TransitionStart');
/**  
 * 判断浏览器是否有此Css属性
 * @param {object} map 
 */

function hasStyleProperty(name) {
  const elem = document.createElement('div');
  const style = elem.style;

  hasStyleProperty = function (name) {
    return hasOwn.call(style, name);
  };

  return hasStyleProperty(name);
}
/**
 * 获取指定的css属性值
 * @param {HTMLElement} node 
 * @param {string} name 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 */

function getStyleValue(node, name) {
  const style = window.getComputedStyle(node, null);
  return style ? style.getPropertyValue(cssPrefix + name) || '' : '';
}
/**
 * 获取当前元素的动画持续时间
 * @param {HTMLElement} elem 
 */

function getStyleTimeout(elem) {
  if (hasTransition) {
    const transitionDelay = parseFloat(getStyleValue(elem, 'transition-delay')) || 0;
    const transitionDuration = parseFloat(getStyleValue(elem, 'transition-duration')) || 0;
    const animationDelay = parseFloat(getStyleValue(elem, 'animation-delay')) || 0;
    const animationDuration = parseFloat(getStyleValue(elem, 'animation-duration')) || 0;
    const time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
    return time * 1000 + 200;
  }

  return 0;
}
/**
 * 绑定 transition end 事件处理
 * @param {HTMLElement} elem 
 * @param {Function} onStart
 * @param {Function} onActive
 * @param {Function} onEnd 
 * @example 
 *   cssTransition(
 *    function onStart(elem) {
 *      elem.classList.add(className);
 *    },
 *    function onActive(elem) {
 *      elem.classList.add(activeClassName);
 *    },
 *    function onEnd(elem) {
 *      elem.classList.remove(className);
 *      elem.classList.remove(activeClassName);
 *   });
 * 
 *   cssTransition(
 *    function onStart(elem) {
 *    },
 *    function onActive(elem) {
 *      for (var s in style) {
 *        if (style.hasOwnProperty(s)) {
 *          elem.style[s] = style[s];
 *        }
 *      }
 *    },
 *    function onEnd(elem) {
 *   });
 */
// export function cssTransition(onStart, onEnd, both) {
//   let timer;
//   const listenEnd = e => {
//     if (e && e.target !== elem) {
//       return;
//     }
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//     both ? rmAnimationEnd() : null;
//     rmTransitionEnd();
//     onEnd(elem);
//   };
//   const elem = onStart();
//   let rmAnimationEnd = both ? onAnimationEnd(elem, listenEnd) : null;
//   let rmTransitionEnd = onTransitionEnd(elem, listenEnd);
//   const time = getStyleTimeout(elem);
//   if (time >= 0) {
//     timer = setTimeout(listenEnd, time);
//   }
//   return () => {
//     listenEnd();
//   };
// }
// 获取当前浏览器的es css前缀

function getEsCssPrefix() {
  var testProp = 'Transform';

  for (let prefix of esCssPrefixes) {
    if (hasStyleProperty(prefix + testProp)) {
      return prefix;
    }
  }
} // 设置当前ES的前缀


function getEsPrefix() {
  return esCssPrefix ? esCssPrefix === 'ms' ? 'MS' : esCssPrefix.toLowerCase() : void 0;
} // 设置当前js使用的前缀


function getCssPrefix() {
  return esPrefix ? esPrefix === 'MS' ? '-ms-' : `-${esPrefix}-` : void 0;
} // 设置当前样式的前缀


function prefixProperty(name, prefix) {
  if (prefix == null || prefix === '') {
    return name;
  }

  return prefix + name.charAt(0).toUpperCase() + name.substr(1);
} // 获取当前ES环境中 transition 或 animation 对应的事件名称


function getEsPrefixEvent(type) {
  const lower = type.toLowerCase();
  return hasOwn.call(window, lower) ? lower : esPrefix ? esPrefix + type : lower;
}
/**
 * 生成 transition 或者 animation 的管理函数
 * @param {string} type 
 */


function getEventEmitter(type) {
  return function (node, listen) {
    if (!type) {
      const timer = window.setTimeout(listen, 0);
      return () => {
        window.clearTimeout(timer);
      };
    }

    node.addEventListener(type, listen, false);
    return () => {
      node.removeEventListener(type, listen, false);
    };
  };
}

export { onTransitionEnd as a, animation as b, transform as c, getStyleTimeout as g, onAnimationEnd as o, perspective as p, transition as t };
