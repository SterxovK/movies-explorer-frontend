class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._token = "";
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return Promise.resolve(res.json()).then((data) => {
      return { data, status: res.status };
    });
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleOriginalResponse);
  }

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleOriginalResponse)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        this._token = res.data.token;
        return Promise.resolve(res.status);
      });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleOriginalResponse)
      .then((res) => {
        this._token = token;
        return Promise.resolve(res)
      })
  }

  isLogedIn() {
    return this._token !== "";
  }

  updateCurrentUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._handleOriginalResponse);
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify(data),
    }).then(this._handleOriginalResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleOriginalResponse);
  }

  deleteSavedMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleOriginalResponse);
  }
}

const OPTIONS = {
  baseUrl: "https://api.diploma.sterkhov.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
};

const mainApi = new MainApi(OPTIONS);

export default mainApi;

// localhost:3000 "https://api.diploma.sterkhov.nomoredomains.xyz"
