// https://auth.nomoreparties.co
// Список эндпоинтов:
// / — любой URL, кроме /signup и / signin защищены авторизацией.
// / signup — регистрация пользователя.
// / signin — авторизация пользователя.


class Auth {
  constructor({ url }) {
    // тело конструктора
    this._url = url;
    // this._authToken = token;
    // this._cards = [];
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse)
  }


  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse)

  }


  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    }).then(this._checkResponse)
  }



}


export const auth = new Auth({ url: 'http://localhost:4000' });
//export const auth = new Auth({ url: 'https://api.sigma696.students.nomoredomains.club' });
