import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ locationPathname, data }) {
  const moviesCardsMarkup = data.map((item) => (
    <li key={item.id} className="movies-card">
      <MoviesCard data={item} locationPathname={locationPathname} />
    </li>
  ));

  return <ul className="movies-card-list">
    {moviesCardsMarkup}
    </ul>;
}

export default MoviesCardList;
