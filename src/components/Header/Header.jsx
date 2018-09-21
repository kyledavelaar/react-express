// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';


import s from './Header.scss';

type Props = {
  links: [],
}

const Header = (props: Props) => {
  return (
    <div id={s.wrapper}>
      <ul className={s.nav_ul}>
        {/* <li><img className={s.logo} src={Logo} alt="MPULSE_LOGO"/></li> */}
        { renderLinks(props.links) }
        <li className={s.right_nav}>Username</li>
      </ul>
    </div>
  )
}

function renderLinks(links: []) {
  return links.map((link, i) => {
    let route;
    if (link === 'Home') {
      route = '/';
    } else {
      route = '/' + link;
    }
    return (
      <li key={i}>
        <NavLink
          to={route}
          className={s.link}
          activeClassName={s.selectedTab}
          exact
        >
          { link }
          {/* <button><span className={`icon-${link}`}></span></button>  */}
        </NavLink>
      </li>
    )
  })
}

export default Header;