import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthNavigation = React.memo((props) => {
  const AUTH_NAVIGATION_LINKS = [
    {
      id: 1,
      title: 'Регистрация',
      link: '/sign-up',
      className: 'auth-nav__link',
    },
    {
      id: 2,
      title: 'Войти',
      link: '/sign-in',
      className: 'auth-nav__link auth-nav__link_bgcolor-black',
    },
  ];

  const authNavLinks = AUTH_NAVIGATION_LINKS.map((item) => (
    <li key={item.id} className="auth-nav__nav-list-item">
      <NavLink className={item.className} to={item.link}>
        {item.title}
      </NavLink>
    </li>
  ));
  return (
    <nav className="auth-nav">
      <ul className="auth-nav__nav-list">{authNavLinks}</ul>
    </nav>
  );
});

export default AuthNavigation;
