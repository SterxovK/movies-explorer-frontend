import React from 'react';

const PROMO_TITLE_TEXT = 'Учебный проект студента факультета Веб-разработки.';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">{PROMO_TITLE_TEXT}</h1>
        <div className="promo__img"></div>
      </div>
    </section>
  );
}

export default Promo;
