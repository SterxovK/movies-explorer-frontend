import React from 'react';

import {useHistory, useLocation} from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import SearchForm from '../SearchForm/SearchForm';

import Notification from '../Notification/Notification';

import NO_MOVIES_FOUND_TEXT from '../../constants/no-movies-found-text';
import DELETE_MOVIE_ERROR_TEXTS from "../../constants/delete-movie-error-texts";
import SAVE_MOVIE_ERROR_TEXTS from "../../constants/save-movie-error-texts";

function Movies({
                  storage,
                  onError,
                }) {
  let location = useLocation();
  const history = useHistory();


  const [moviesData, setMoviesData] = React.useState([]);
  const [favoriteMovieIDs, setFavoriteMovieIDs] = React.useState(new Map());
  const [searchTerm, setSearchTerm] = React.useState({});
  const [isLoadingData, setIsLoadingData] = React.useState(false);


  const handleSubmit = (data) => {
    handleSearchMoviesData(data)
  };

  const handleSearchMoviesData = (searchQueries = {}) => {
    storage.saveSearchState(searchQueries.term, searchQueries.short)

    handleFilteredMovies(searchQueries.term, searchQueries.short)
  };

  const handleFilteredMovies = (term, short) => {
    setIsLoadingData(true)
    storage.getFilteredMovies(term, short)
      .then((filteredMovies) => {
        storage.getFavoriteMovies(short)
          .then((fMovies) => {
            const fMap = new Map();
            fMovies.forEach((movie) => {
              fMap.set(movie.movieId, true)
            })
            setFavoriteMovieIDs(fMap)
          })
        setMoviesData(filteredMovies);
      })
      .finally(() => {
        setIsLoadingData(false)
      })
  }


  const onDeleteSavedMovie = (id) => {
    storage
      .deleteFavoriteMovie(id)
      .then(() => {
        favoriteMovieIDs.delete(id)
        setFavoriteMovieIDs(new Map(favoriteMovieIDs));
      })
      .catch((err) => {
        onError(`${DELETE_MOVIE_ERROR_TEXTS.BASE_TEXT} ${err}`)
      })
  };

  const handleSaveFavoriteMovie = (data) => {
    storage
      .saveFavoriteMovie(data)
      .then(() => {
        setFavoriteMovieIDs(new Map(favoriteMovieIDs.set(data.movieId, true)));
      })
      .catch((err) => {
        onError(`${SAVE_MOVIE_ERROR_TEXTS.BASE_TEXT} ${err}`);
      })

    const token = localStorage.getItem("jwt");
    if (!token) {
      history.push("/signin");
    }
  };

  const prevSearch = storage.getSearchState()

  React.useEffect(() => {
    if (!prevSearch.term) {
      return
    }

    setSearchTerm(prevSearch)
    handleFilteredMovies(prevSearch.term, prevSearch.short)
  }, [])

  return (
    <main>
      <SearchForm
        searchTerm={searchTerm}
        onSubmit={handleSubmit}
      />
      {!isLoadingData && moviesData.length === 0 && (
        <Notification text={NO_MOVIES_FOUND_TEXT.BASE_TEXT}/>
      )}
      {isLoadingData && <Preloader/>}
      <MoviesCardList
        data={moviesData}
        favoriteMovieIDs={favoriteMovieIDs}
        locationPathname={location.pathname}
        onSaveMovie={handleSaveFavoriteMovie}
        onDeleteSavedMovie={onDeleteSavedMovie}
      />
    </main>
  );
}

export default Movies;
