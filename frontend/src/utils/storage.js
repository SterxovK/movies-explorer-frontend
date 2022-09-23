import MoviesApi from "./MoviesApi";
import mainApi from "./MainApi";

class Storage {
  constructor() {
    this._moviesApi = new MoviesApi({
      baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this._mainApi = mainApi;
  }

  _getMoviesFromCache() {
    return JSON.parse(localStorage.getItem("movies")) || [];
  }

  _setMoviesCache(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  async getMovies() {
    const cachedMovies = this._getMoviesFromCache();
    if (cachedMovies.length > 0) {
      return cachedMovies;
    }
    const movies = await this._moviesApi.getMoviesData();
    // const aaa = movies.data.map((item) => {
    //   item.saved = true;
    //   return item;
    // })
     this._setMoviesCache(movies.data);
     return movies.data;
  }
  _getSavedMoviesFromCache() {
    return JSON.parse(localStorage.getItem("saved-movies")) || [];
  }

  _setSavedMoviesCache(movies) {
    localStorage.setItem("saved-movies", JSON.stringify(movies));
  }

  async getSavedMovies() {
    if (!this._mainApi.isLogedIn()) {
      return [];
    }

    return await this._getSavedMoviesIds();
  }

  async _getSavedMoviesIds() {
    if (!this._mainApi.isLogedIn()) {
      return [];
    }
    const cachedSavedMovies = this._getSavedMoviesFromCache();
    if (cachedSavedMovies.length > 0) {
      return cachedSavedMovies;
    }
    const savedMovies = await this._mainApi.getSavedMovies();
    const savedArr = savedMovies.map((item) => {
      item.saved = true;
      return item;
    });
    this._setSavedMoviesCache(savedArr);

    return savedArr;
  }

  deleteSavedMovie(id) {
    if (!this._mainApi.isLogedIn()) {
      return;
    }
    this._mainApi.deleteSavedMovie(id).then(() => {
      const savedMovies = this._getSavedMoviesFromCache();
      savedMovies.filter((movieId) => {
        return movieId !== id;
      });
      this._setSavedMoviesCache(savedMovies);
    });
  }

  saveMovie(movie) {
    console.log(676767, movie);
    if (!this._mainApi.isLogedIn()) {
      console.log(movie);
      return;
    }

    return this._mainApi
      .saveMovie(movie)
      .then(() => {
        const savedMovies = this._getSavedMoviesFromCache();
        movie.saved = true;
        savedMovies.push(movie);
        this._setSavedMoviesCache(savedMovies);
        console.log(565656);
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default Storage;
