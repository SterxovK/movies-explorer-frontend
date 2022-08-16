import React, { useState, useEffect } from 'react';

function SearchForm({
  filmsInputSearch,
  filmsTumbler,
  handleGetMovies,
}) {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setTumbler(filmsTumbler);
    setInputSearch(filmsInputSearch);
  }, [filmsTumbler, filmsInputSearch]);

  return (
    <form className="search">
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          value={inputSearch || ''}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="search__button" onClick={handleSubmit}>
          Найти
        </button>
      </div>
      <div className="search__toggle">
        <label className="search__tumbler">
          <input
            className="search__checkbox"
            type="checkbox"
            value={tumbler}
          />
          <span className="search__slider" /> 
        </label>
        <p className="search__films">Короткометражки</p>
      </div>
      
    </form>
  );
}

export default SearchForm;
