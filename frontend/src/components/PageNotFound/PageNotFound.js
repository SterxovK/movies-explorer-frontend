import React from 'react';
import {Link} from 'react-router-dom'

function PageNotFound() {

    const NOT_FOUND_TITLE = '404';
    const NOT_FOUND_TEXT = 'Страница не найдена';
    const NOT_FOUND_LINK = 'Назад';

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">{NOT_FOUND_TITLE}</h1>
        <p className="not-found__text">{NOT_FOUND_TEXT}</p>
      <Link to="/" className="not-found__link">
        {NOT_FOUND_LINK}
      </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
