import React from 'react';
import { useRouteMatch } from "react-router-dom";

import AuthNavigation from '../AuthNavigation/AuthNavigation';

import Navigation from '../Navigation/Navigation';

import LogoLink from '../LogoLink/LogoLink';

import MenuButton from '../MenuButton/MenuButton';

 const exclusionRoutesArray = ["/signin", "/signup", "/profile", "/movies", "/saved-movies"];



function Header(props) {
  return (
    <header
      className="header"
      style={
        useRouteMatch(exclusionRoutesArray)
          ? { background: "#fff" }
          : { background: "#f3c1f8" }
      }
    >
      <LogoLink />
      {props.loggedIn ? <Navigation /> : <AuthNavigation />}
      {props.loggedIn && <MenuButton onOpenMenu={props.onOpenMenu} />}
    </header>
  );
}

export default Header;
