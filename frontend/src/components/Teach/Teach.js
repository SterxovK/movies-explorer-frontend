import React from 'react';

function Teach() {
  const TEACH_HEADER = 'Технологии';
  const TEACH_TITLE = '7 технологий';
  const TEACH_SUBTITLE =
    'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.';

  const TEACH_DATA = [
    {
      id: 1,
      title: 'HTML',
    },
    {
      id: 2,
      title: 'CSS',
    },
    {
      id: 3,
      title: 'JS',
    },
    {
      id: 4,
      title: 'React',
    },
    {
      id: 5,
      title: 'Git',
    },
    {
      id: 6,
      title: 'Express.js',
    },
    {
      id: 7,
      title: 'mongoDB',
    },
  ];

  const Teach = TEACH_DATA.map((item) => (
    <li className="teach__points" key={item.id}>
      <h3 className="teach__name">{item.title}</h3>
    </li>
  ));

  return (
    <section className="teach">
      <h2 className="teach__header">{TEACH_HEADER}</h2>
      <h3 className="teach__title">{TEACH_TITLE}</h3>
      <p className="teach__subtitle">{TEACH_SUBTITLE}</p>
      <article className="teach__container">
        <ul className="teach__content">{Teach}</ul>
      </article>
    </section>
  );
}

export default Teach;
