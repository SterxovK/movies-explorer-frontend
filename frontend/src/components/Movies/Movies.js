import React from 'react';
import { useLocation } from 'react-router-dom';

import LogoLink from '../LogoLink/LogoLink';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MenuButton from '../MenuButton/MenuButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import MovieCardImage from '../../images/movies-img/src-movie-img.png';

import ShowMoreButton from '../ShowMoreButton/ShowMoreButton'

function Movies(props) {
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
      id: 3,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
      isShortFilm: true,
    },
    {
      id: 4,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
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
    {
      id: 6,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
      isShortFilm: false,
    },
    {
      id: 7,
      title: '33 слова о дизайне',
      subtitle: '1ч 47м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
      isShortFilm: true,
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
      <ShowMoreButton onClick={() => console.log('Show more')} />
    </section>
  );
}

export default Movies;
