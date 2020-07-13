import '@writ/scss/components/crumbs.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil } from '../dependency';
export { Crumbs }

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
   const { className, routes, sep, children, render, style } = props;
   const lastIndex = routes.length - 1;

   return (
      <div className={classnames(CSSUtil.crumb, className)} style={style}>
         {children}
         {routes ? routes.map((route, index) => (
            <span key={index}>
               {index < lastIndex
                  ? render
                     ? render(route.name, route.path)
                     : <a href={route.path}>{route.name}</a>
                  : route.name}
               {index < lastIndex
                  ? <b className='sep'>{sep}</b>
                  : null}
            </span>
         )) : null}
      </div>
   );
}
Crumbs.defaultProps = {
   routes: [],
   sep: '/',
};
if (window.DEV) {
   Crumbs.propTypes = {
      routes: PropTypes.arrayOf(PropTypes.shape({
         name: PropTypes.string,
         path: PropTypes.string
      })).isRequired,
      sep: PropTypes.string.isRequired,
      render: PropTypes.func
   };
}