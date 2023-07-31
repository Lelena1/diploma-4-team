class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  authentication(data) {
    return fetch(`${this._url}/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
}

const auth = new Auth({
  url: "http://localhost:8080",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
