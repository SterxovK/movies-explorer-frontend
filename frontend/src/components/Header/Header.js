import React from 'react';
import LogoLink from '../LogoLink/LogoLink';
import AuthNavigation from '../AuthNavigation/AuthNavigation';


function Header(props) {
   
  return (
    <header className="header">
     <LogoLink />
     <AuthNavigation />
    </header>
  );
}

export default Header;