import React from 'react';
import Photo from '../../images/photo.jpg';
import {ReactComponent as PortfolioArrow} from '../../images/portfolio-arrow.svg'

function AboutMe() {
  const ABOUT_ME_HEADER = 'Студент';
  const ABOUT_ME_TITLE = 'Константин';
  const ABOUT_ME_SUBTITLE = 'Фронтенд-разработчик, 32 года';
  const ABOUT_ME_MAIN_TEXT =
    'Я родился и живу в Ижевске, закончил факультет экономики УДГУ. Увлекся програмированием еще в школе, но профессионально решил заняться только сейчас. Прошел курс по веб-разработке от Яндекс-Практикум.';
  const PORTFOLIO = 'Портфолио';

  const ABOUT_ME_LINKS = [
    {
      id: 1,
      name: 'Telegram',
      link: 'https://t.me/Sterxovk',
    },
    {
      id: 2,
      name: 'Github',
      link: 'https://github.com/SterxovK',
    },
  ];

  const ABOUT_ME_PORTFOLIO_LINKS = [
    {
      id: 1,
      name: 'Статичный сайт',
      link: 'https://github.com/SterxovK/how-to-learn',
    },
    {
      id: 2,
      name: 'Адаптивный сайт',
      link: 'https://github.com/SterxovK/russian-travel',
    },
    {
      id: 3,
      name: 'Одностраничное приложение',
      link: 'https://github.com/SterxovK/mesto',
    },
  ];

  const AboutMeLinks = ABOUT_ME_LINKS.map((item) => (
    <li className="about-me__points" key={item.id}>
      <a className="about-me__link" href={item.link}>
        <p className="about-me__name-link">{item.name}</p>
      </a>
    </li>
  ));

  const AboutMePortfolioLink = ABOUT_ME_PORTFOLIO_LINKS.map((item) => (
    <li className="about-me__portfolio-points" key={item.id}>
      <a className="about-me__portfolio-link" href={item.link}>
        <p className="about-me__portfolio-name-link">{item.name}</p>
        <PortfolioArrow/>
      </a>
    </li>
  ));

  return (
    <section className="about-me">
      <h2 className="about-me__header">{ABOUT_ME_HEADER}</h2>
      <div className="about-me_container">
        <h3 className="about-me__title">{ABOUT_ME_TITLE}</h3>
        <p className="about-me__subtitle">{ABOUT_ME_SUBTITLE}</p>
        <p className="about-me__main-text">{ABOUT_ME_MAIN_TEXT}</p>
        <img className="about-me__photo" src={Photo} alt="Фото студента" />
        <article className="about-me__links-container">
          <ul className="about-me__links-content">{AboutMeLinks}</ul>
        </article>
      </div>
      <h4 className="about-me__portfolio-links-title">{PORTFOLIO}</h4>
      <article className="about-me__portfolio-links-container">
        <ul className="about-me__portfolio-links-content">
          {AboutMePortfolioLink}
        </ul>
      </article>
    </section>
  );
}

export default AboutMe;
