import React from 'react';

function Footer() {
  const FOOTER_HEADER = 'Учебный проект Яндекс.Практикум х BeatFilm.';
  const FOOTER_COPYRIGHT = '© 2020';
 
  const FOOTER_LINKS = [
    {
      id: 1,
      name: 'Яндекс.Практикум',
      link: 'https://practicum.yandex.ru/web',
    },

    {
      id: 2,
      name: 'Telegram',
      link: 'https://t.me/Sterxovk',
    },
    {
      id: 3,
      name: 'Github',
      link: 'https://github.com/SterxovK',
    },
  ];

  const FooterLinks = FOOTER_LINKS.map((item) => (
    <li className="footer__points" key={item.id}>
      <a className="footer__link" href={item.link}>
        <p className="footer__name-link">{item.name}</p>
      </a>
    </li>
  ));

  return (
    <footer className="footer">
      <h3 className="footer__header">{FOOTER_HEADER}</h3>
      <div className="footer_container">
        <p className="footer__copyright">{FOOTER_COPYRIGHT}</p>
        <ul className="footer__links-content">
          {FooterLinks}
        </ul>
        </div>
    </footer>
  );
}

export default Footer;