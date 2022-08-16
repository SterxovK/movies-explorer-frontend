import React from 'react';
import FavoritesButton from '../FavoritesButton/FavoritesButton';

function MoviesCard({ data, locationPathname }) {
  const [isMarked, setIsMarked] = React.useState(data.isMarked);

  const handleMarkMovieCard = () => {
    setIsMarked(!isMarked);
  };

  return (
    <>
        <img
          className="movies-card-article__image"
          alt={data.imageAlt}
          src={data.imageSrc}
        />
        <div className="movies-card-article__text-container">
        <h2 className="movies-card-article__title">{data.title}</h2>
        <FavoritesButton
          className="movies-card-article__favorite-button"
          onClick={handleMarkMovieCard}
          isMarked={isMarked}
          locationPathname={locationPathname}
        />
        </div>
        <p className="movies-card-article__subtitle">{data.subtitle}</p>
      
    </>
  );
}
export default MoviesCard;
