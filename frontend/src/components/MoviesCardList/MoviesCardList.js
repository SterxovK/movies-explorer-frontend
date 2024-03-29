import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

import useCurrentSize from "../../hooks/useCurrentSize";

import MOVIE_CARDLIST_CONSTS from "../../constants/movie-cardList-consts";

function MoviesCardList({
  locationPathname,
  data,
  favoriteMovieIDs,
  onSaveMovie,
  onDeleteSavedMovie,
}) {

  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [isShowButtonActive, setIsShowButtonActive] = React.useState(false);
  const [numberMoviesToRender, setNumberMoviesToRender] = React.useState(0);
  const [numberMoviesToAdd, setNumberMoviesToAdd] = React.useState(0);

  const size = useCurrentSize();
  const {
    SIZE_WIDTH_LARGE,
    SIZE_WIDTH_MEDIUM,
    SIZE_WIDTH_SMALL,
    NUMBER_MOVIES_TO_RENDER_LARGE,
    NUMBER_MOVIES_TO_RENDER_MEDIUM,
    NUMBER_MOVIES_TO_RENDER_SMALL,
    NUMBER_MOVIES_TO_ADD_LARGE,
    NUMBER_MOVIES_TO_ADD_MEDIUM,
    ZERO_NUMBER,
  } = MOVIE_CARDLIST_CONSTS;

  const countNumberMoviesToRender = () => {
    if (size.width >= SIZE_WIDTH_LARGE) {
      setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_LARGE);
      setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_LARGE);
    } else if (
      size.width < SIZE_WIDTH_LARGE &&
      size.width >= SIZE_WIDTH_MEDIUM
    ) {
      setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_MEDIUM);
      setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_MEDIUM);
    } else if (
      size.width < SIZE_WIDTH_MEDIUM &&
      size.width >= SIZE_WIDTH_SMALL
    ) {
      setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_SMALL);
      setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_MEDIUM);
    }
  };

  const handleShowMoreMoviesButtonClick = () => {
    setMoviesToRender(
      data.slice(ZERO_NUMBER, moviesToRender.length + numberMoviesToAdd)
    );
    if (moviesToRender.length >= data.length - numberMoviesToAdd) {
      setIsShowButtonActive(false);
    }
  };

  React.useEffect(() => {
    countNumberMoviesToRender();
  }, [size.width]);

  React.useEffect(() => {
    if (locationPathname === "/movies") {
      setMoviesToRender(data.slice(ZERO_NUMBER, numberMoviesToRender));
      if (data.length <= numberMoviesToRender) {
        setIsShowButtonActive(false);
      } else {
        setIsShowButtonActive(true);
      }
    } else if (locationPathname === "/saved-movies") {
      setMoviesToRender(data);
      setIsShowButtonActive(false);
    }
  }, [data, numberMoviesToRender]);

  const moviesCardsMarkup = moviesToRender.map((item) => (
    <li key={item.id || item._id}>
      <MoviesCard
        data={item}
        isFavorite={favoriteMovieIDs.get(item.id) || false}
        locationPathname={locationPathname}
        onSaveMovie={onSaveMovie}
        onDeleteSavedMovie={onDeleteSavedMovie}
      />
    </li>
  ));

  const MOVIES_CARD_LIST_STYLE_SETTINGS = {
    list: "movies-card-list",
  };

  return (
    <>
      <ul className={MOVIES_CARD_LIST_STYLE_SETTINGS.list}>
        {moviesCardsMarkup}
      </ul>
      {locationPathname === "/movies" && isShowButtonActive ? (
        <ShowMoreButton onClick={handleShowMoreMoviesButtonClick} />
      ) : null}
    </>
  );
}

export default MoviesCardList;
