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

  // search
  saveSearchState(term, short = false) {
    localStorage.setItem("searchTerm", JSON.stringify({"term": term, "short": short}))
  }

  getSearchState() {
    const res = {
      "term": "",
      "short": false
    }
    const item = localStorage.getItem("searchTerm")
    if (item) {
      const json = JSON.parse(item)
      res.term = json.term || ""
      res.short = json.short || false
    }

    return res
  }


  movieFilter(movie, term, short) {
    if (short) {
      if (movie.duration <= 40 && (movie.nameRU.toLowerCase().includes(term.toLowerCase()) || movie.nameEN.toLowerCase().includes(term.toLowerCase()))) {
        return true
      }
    } else {
      if (movie.nameRU.toLowerCase().includes(term.toLowerCase()) || movie.nameEN.toLowerCase().includes(term.toLowerCase())) {
        return true
      }
    }

    return false
  }

  shortMovieFilter(movie) {
    return movie.duration <= 40
  }

  async getFilteredMovies(term, short) {
    if (term === '') {
      return [];
    }

    const allMovies = await this.getMovies();
    return allMovies.filter((movie) => this.movieFilter(movie, term, short))
  }

  // end search

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
    this._setMoviesCache(movies.data);
    return movies.data;
  }

  _getSavedMoviesFromCache() {
    return JSON.parse(localStorage.getItem("saved-movies")) || [];
  }

  _setSavedMoviesCache(movies) {
    localStorage.setItem("saved-movies", JSON.stringify(movies));
  }

  // saved movies
  async getFilteredFavoriteMovies(term, short) {
    const allFavorite = await this.getFavoriteMovies(short);
    return allFavorite.filter((movie) => this.movieFilter(movie, term, short))
  }

  async getFavoriteMovies(short = false) {
    if (!this._mainApi.isLogedIn()) {
      return [];
    }

    const res = await this._mainApi.getSavedMovies();
    let savedMovies = res.data;
    if (short) {
      savedMovies = savedMovies.filter(this.shortMovieFilter)
    }

    return savedMovies
  }

  deleteFavoriteMovie(id) {
    if (!this._mainApi.isLogedIn()) {
      return;
    }
    return this._mainApi.deleteSavedMovie(id)
  }

  saveFavoriteMovie(movie) {
    if (!this._mainApi.isLogedIn()) {
      return new Error("not authorized")
    }

    return this._mainApi.saveMovie(movie)
  }
}

export default Storage;
