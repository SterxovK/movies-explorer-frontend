import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileNavigation = React.memo((props) => {
  const MOBILE_NAVIGATION_LINKS = [
    {
      id: 1,
      title: 'Главная',
      link: '/',
      className: 'mobile-navigation__link',
      onclick: () => {
        props.onModalClose();
      },
      exact: false,
    },
    {
      id: 2,
      title: 'Фильмы',
      link: '/movies',
      className: 'mobile-navigation__link',
      activeClassName: 'mobile-navigation__link_active',

      onclick: () => {
        props.onModalClose();
      },
      exact: false,
    },
    {
      id: 3,
      title: 'Сохраненные фильмы',
      link: '/saved-movies',
      className: 'mobile-navigation__link',
      activeClassName: 'mobile-navigation__link_active',

      onclick: () => {
        props.onModalClose();
      },
      exact: false,
    },
  ];

  const mobileNavLinks = MOBILE_NAVIGATION_LINKS.map((item) => (
    <li key={item.id} className="mobile-navigation__nav-list-item">
      <NavLink
        className={item.className}
        activeClassName={item.activeClassName}
        to={item.link}
        exact={item.exact}
        onClick={item.onclick}
      >
        {item.title}
      </NavLink>
    </li>
  ));

  return (
    <nav className="mobile-navigation">
      <ul className="mobile-navigation__nav-list">{mobileNavLinks}</ul>
    </nav>
  );
});

export default MobileNavigation;
