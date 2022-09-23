 class MoviesApi {
  constructor (options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return Promise.resolve(res.json())
      .then((data) => {
        return { data, status: res.status }
      })
  };

  getMoviesData() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  };
};

export default MoviesApi;
