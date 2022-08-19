import React from 'react';

function AboutProject() {
  const ABOUT_PROJECT_TITLE = 'О проекте';

  const ABOUT_PROJECT_DATA = [
    {
      id: 1,
      title: 'Дипломный проект включал 5 этапов',
      text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    },
    {
      id: 2,
      title: 'На выполнение диплома ушло 5 недель',
      text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    },
  ];

  const CHART_DATA = [
    {
      id: 1,
      unitText: '1 неделя',
      subText: 'Back-end',
      background: '#000',
      color: '#fff',
    },
    {
      id: 2,
      unitText: '4 недели',
      subText: 'Front-end',
      background: '#F2F2F2',
      color: '#000',
    },
  ];

  const AboutProject = ABOUT_PROJECT_DATA.map((article) => (
    <li className="about-project__points" key={article.id}>
      <h3 className="about-project__title">{article.title}</h3>
      <p className="about-project__text">{article.text}</p>
    </li>
  ));

  const AboutTimeProject = CHART_DATA.map((item) => (
    <li className="about-time-project__points" key={item.id}>
      <h4
        className="about-time-project__title"
        style={{ background: item.background, color: item.color }}
      >
        {item.unitText}
      </h4>
      <p className="about-time-project__text">{item.subText}</p>
    </li>
  ));

  return (
    <section className="about-project">
      <h2 className="about-project__header">{ABOUT_PROJECT_TITLE}</h2>
      <article className="about-project__container">
        <ul className="about-project__content">{AboutProject}</ul>
      </article>
      <article className="about-time-project__container">
        <ul className="about-time-project__content">{AboutTimeProject}</ul>
      </article>
    </section>
  );
}

export default AboutProject;
