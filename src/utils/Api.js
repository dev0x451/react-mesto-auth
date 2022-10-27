class Api {
  constructor({ url, headers }) {
    // тело конструктора
    this._url = url;
    // this._authToken = token;
    this._headers = headers;
    this._cards = [];
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json()
    }
    else return Promise.reject(`Ошибка промиса: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._checkResponse)

  }

  addCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers

    }).then(this._checkResponse)
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse)
  }

  setUser(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    }).then(this._checkResponse)
  }

  setAvatar(avatarURL) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatarURL
      })
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, like) {

    if (like) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers

      }).then(this._checkResponse)
    }
    else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers

      }).then(this._checkResponse)

    }
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '4a3a5ed7-c33c-4007-ab2f-bb1055621552',
    'Content-Type': 'application/json'
  }
});

