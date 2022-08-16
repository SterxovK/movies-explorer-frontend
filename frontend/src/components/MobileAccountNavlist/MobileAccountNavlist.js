import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as AccountIcon } from '../../images/avatar__img.svg';

const MobileAccountNavlist = React.memo((props) => {
  const MOBILE_ACCOUNT_LINKS = [
    {
      id: 1,
      title: 'Аккаунт',
      link: '/profile',
      className: 'mobile-account-nav__link',
      children: <AccountIcon className="account-link__icon" />,
    },
  ];

  const MobileAccountLinks = MOBILE_ACCOUNT_LINKS.map((item) => (
    <li key={item.id} className="mobile-account-nav__list-item">
      <Link key={item.id} className={item.className} to={item.link}>
        {item.title}
        {item.children}
      </Link>
    </li>
  ));

  return (
    <nav className="mobile-account-nav">
      <ul className="mobile-account-nav__list">{MobileAccountLinks}</ul>
    </nav>
  );
});

export default MobileAccountNavlist;
