import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Teach from '../Teach/Teach';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
      <main className="main">
        <Promo />
        <AboutProject />
        <Teach />
        <AboutMe />
      </main> 
  );
}

export default Main;
