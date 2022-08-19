import React from 'react';

import { useLocation } from 'react-router-dom';

import LogoLink from '../LogoLink/LogoLink';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MenuButton from '../MenuButton/MenuButton';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import MovieCardImage from '../../images/movies-img/src-movie-img.png';

function SavedMovies(props) {
  let location = useLocation();

  const MOVIES_CARD_LIST_DATA = [
    {
      id: 1,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: false,
      isShortFilm: true,
    },
    {
      id: 2,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: false,
      isShortFilm: false,
    },
    {
      id: 5,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: false,
      isShortFilm: false,
    },
  ];

  return (
    <section className="movies">
      <div className="movies__header-container">
        <LogoLink />
        <Navigation />
        <MenuButton onOpenMenu={props.onOpenMenu} />
      </div>
      <SearchForm />
      <MoviesCardList
        data={MOVIES_CARD_LIST_DATA}
        locationPathname={location.pathname}
      />
    </section>
  );
}

export default SavedMovies;
