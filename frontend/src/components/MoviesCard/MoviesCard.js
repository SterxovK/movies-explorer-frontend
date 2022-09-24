import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import FavoritesButton from '../FavoritesButton/FavoritesButton';

import convertTime from '../../utils/convertTime';

import getFullImageUrl from '../../utils/getFullImageUrl';

import getTrailerUrl from '../../utils/getTrailerUrl';

function MoviesCard({
                      data,
                      isFavorite,
                      locationPathname,
                      onSaveMovie,
                      onDeleteSavedMovie,
                    }) {

  const [movieData] = React.useState({
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getFullImageUrl(data),
    trailer: getTrailerUrl(data),
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.movieId || data.id,
    thumbnail: getFullImageUrl(data),
  })

  const handleClickFavoriteButton = () => {
    if (locationPathname === '/movies') {
      if (isFavorite) {
        onDeleteSavedMovie(movieData.movieId);
      } else {
        onSaveMovie(movieData);
      }
    } else if (locationPathname === '/saved-movies') {
      onDeleteSavedMovie(movieData.movieId);
    }
  };


  const MOVIES_CARD_STYLE_SETTINGS = {
    article: 'movies-card-article',
    header: 'movies-card-article__header',
    textContainer: 'movies-card-article__text-container',
    title: 'movies-card-article__title',
    subtitle: 'movies-card-article__subtitle',
    imageSection: 'movies-card-article__image-section',
    image: 'movies-card-article__image',
    favoriteButton: 'movies-card-article__favorite-button',
    removeFavoritesButtonIcon: 'movies-card-article__favorite-button-icon-remove',
    addFavoritesButtonIcon: 'movies-card-article__favorite-button-icon-add',
  };

  return (
    <MainArticle
      id={data._id || movieData.movieId}
      className={MOVIES_CARD_STYLE_SETTINGS.article}
    >
      <MainArticle.Section className={MOVIES_CARD_STYLE_SETTINGS.imageSection}>
        <a
          href={movieData.trailer}
          target="_blank"
          aria-label={`Открыть трейлер фильма "${movieData.nameRU}" на youtube.com`} rel="noreferrer"
        >
          <img
            className={MOVIES_CARD_STYLE_SETTINGS.image}
            alt={movieData.nameRU || movieData.nameEN}
            src={movieData.image}
          />
        </a>
      </MainArticle.Section>
      <MainArticle.Header className={MOVIES_CARD_STYLE_SETTINGS.header}>
        <div className={MOVIES_CARD_STYLE_SETTINGS.textContainer}>
          <h2 className={MOVIES_CARD_STYLE_SETTINGS.title}>
            {movieData.nameRU || movieData.nameEN}
          </h2>
          <p className={MOVIES_CARD_STYLE_SETTINGS.subtitle}>
            {convertTime(movieData.duration)}
          </p>
        </div>
        <FavoritesButton
          className={MOVIES_CARD_STYLE_SETTINGS.favoriteButton}
          onClick={handleClickFavoriteButton}
          locationPathname={locationPathname}
          isSaved={isFavorite}
        />
      </MainArticle.Header>
    </MainArticle>
  );
}


export default MoviesCard;
