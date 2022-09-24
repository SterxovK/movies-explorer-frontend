import React from 'react';

import {useLocation} from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Notification from '../Notification/Notification';

import MOVIES_ERRORS_TEXTS from '../../constants/movies-errors-texts';

import NO_MOVIES_FOUND_TEXT from '../../constants/no-movies-found-text';

function SavedMovies({
                       storage,
                     }) {
  const [isMoviesApiError, setIsMoviesApiError] = React.useState(false);
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [favoriteMovieIDs, setFavoriteMovieIDs] = React.useState(new Map());
  const [searchTerm] = React.useState({});

  const handleSubmit = (data) => {
    loadFavoriteMovies(data);
  }

  let location = useLocation();

  const onDeleteSavedMovie = (id) => {
    storage
      .deleteFavoriteMovie(id)
      .then(() => {
        setFavoriteMovies(favoriteMovies.filter(movie => {
          return movie.movieId !== id;
        }))
      })
  }

  const loadFavoriteMovies = (searchTerm) => {
    if (searchTerm.term) {
      storage.getFilteredFavoriteMovies(searchTerm.term, searchTerm.short)
        .then((fMovies) => {
          const m = new Map();
          fMovies.forEach((movie) => {
            m.set(movie.movieId, true);
          })
          setFavoriteMovies(fMovies);
          setFavoriteMovieIDs(m);
        }).catch((err) => {
        setIsMoviesApiError(true)
      })
    } else {
      storage.getFavoriteMovies(searchTerm.short || false)
        .then((fMovies) => {
          const m = new Map();
          fMovies.forEach((movie) => {
            m.set(movie.movieId, true);
          })

          setFavoriteMovies(fMovies);
          setFavoriteMovieIDs(m);
        }).catch((err) => {
        setIsMoviesApiError(true)
      })
    }
  }

  React.useEffect(() => {
    loadFavoriteMovies(searchTerm)
  }, [])

  return (
    <main>
      <SearchForm
        onSubmit={handleSubmit}
        searchTerm={searchTerm}
        isFavorite={true}
      />
      {(favoriteMovies.length === 0 &&
        < Notification
          text={NO_MOVIES_FOUND_TEXT.SAVED_IS_EMPTY}
        />
      )}
      {isMoviesApiError && (
        <Notification
          text={MOVIES_ERRORS_TEXTS.BASE_ERROR}
        />
      )}
      <MoviesCardList
        data={favoriteMovies}
        favoriteMovieIDs={favoriteMovieIDs}
        locationPathname={location.pathname}
        onDeleteSavedMovie={onDeleteSavedMovie}
      />
    </main>
  )
}

export default SavedMovies;
