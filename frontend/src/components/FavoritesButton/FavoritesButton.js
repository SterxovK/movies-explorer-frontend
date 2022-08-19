import React, { Children } from 'react';

import { ReactComponent as AddFavoritesButtonIcon } from '../../images/like.svg';
import { ReactComponent as AddFavoritesButtonIconMarked } from '../../images/like-active.svg';
import { ReactComponent as RemoveFavoritesButtonIcon } from '../../images/delete-icon.svg';

function FavoritesButton({
  className,
  ariaLabel,
  onClick,
  locationPathname,
  isMarked,
}) {
  return (
    <button className={className} aria-label={ariaLabel} onClick={onClick}>
      {locationPathname === '/saved-movies' ? (
        <RemoveFavoritesButtonIcon />
      ) : locationPathname === '/movies' && isMarked ? (
        <AddFavoritesButtonIconMarked />
      ) : (
        <AddFavoritesButtonIcon />
      )}
    </button>
  );
}

export default FavoritesButton;
