import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

/**
 * 面包屑导航
 * @param {object} props
 * @example
 *  const routes= [
 *     {name: 'Home', path: '/home'},
 *     {name: 'Note', path: '/home/note'},
 *     {name: 'List'},
 *  ];
 *  <Crumbs routes={routes} render={(name, path) => <Link to={path}>{name}</Link>}>
 *    <Button theme='muted' style={{ marginRight: 8 }}>
 *       <Icon type='back' />
 *    </Button>
 *   </Crumbs>
 */

function Crumbs(props) {
  var className = props.className,
      routes = props.routes,
      sep = props.sep,
      children = props.children,
      render = props.render,
      style = props.style;
  var lastIndex = routes.length - 1;
  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames(CSSUtil.crumb, className),
    style: style
  }, children, routes ? routes.map(function (route, index) {
    return /*#__PURE__*/React__default.createElement("span", {
      key: index
    }, index < lastIndex ? render ? render(route.name, route.path) : /*#__PURE__*/React__default.createElement("a", {
      href: route.path
    }, route.name) : route.name, index < lastIndex ? /*#__PURE__*/React__default.createElement("b", {
      className: "sep"
    }, sep) : null);
  }) : null);
}

Crumbs.defaultProps = {
  routes: [],
  sep: '/'
};

if (window.DEV) {
  Crumbs.propTypes = {
    routes: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string,
      path: propTypes.string
    })).isRequired,
    sep: propTypes.string.isRequired,
    render: propTypes.func
  };
}

export { Crumbs };
