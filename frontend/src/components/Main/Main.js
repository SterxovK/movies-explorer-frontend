import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Teach from '../Teach/Teach';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Teach />
      <AboutMe />
      <Footer />
    </main>           
  );
}

export default Main;
