import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ReactComponent as AccountIcon } from '../../images/avatar__img.svg';

const Navigation = React.memo((props) => {
  const NAVIGATION_LINKS = [
    {
      id: 1,
      title: 'Фильмы',
      link: '/movies',
      className: 'navigation__link',
      activeClassName: 'navigation__link_active',
      exact: false,
    },
    {
      id: 2,
      title: 'Сохраненный фильмы',
      link: '/saved-movies',
      className: 'navigation__link',
      activeClassName: 'navigation__link_active',
      exact: false,
    },
     ];
 
  const ACCOUNT_LINKS = [
    {
      id: 1,
      title: 'Аккаунт',
      link: '/profile',
      className: 'account-link',
      children: (
        <AccountIcon
        className="account-link__icon" />
      )
    },
  ];
 

  const navLinks = NAVIGATION_LINKS.map((item) => (
    <li key={item.id} className="navigation__nav-list-item">
      <NavLink
        className={item.className}
        activeClassName={item.activeClassName}
        to={item.link}
        exact={item.exact}
      >
        {item.title}
      </NavLink>
    </li>
  ));

   const accountLinks = ACCOUNT_LINKS.map((item) => (
    <Link
      key={item.id}
      className={item.className}
      to={item.link}
    >
      {item.title}
      {item.children}
    </Link>
  ));

  return (
    <nav className="navigation">
      <ul className="navigation__nav-list">
        <div className="navigation__nav-links-container">{navLinks}</div>
        <li className='navigation__nav-list-item'>{accountLinks}</li> 
      </ul>
    </nav>
  );
});

export default Navigation;
