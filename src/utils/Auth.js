class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json()
    }
    else return Promise.reject(`Ошибка промиса: ${res.status}`)
  }

  signup(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse)
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse)

  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse)

  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse)
  }

}

export const auth = new Auth({
  url: 'https://api.sigma696.students.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});
