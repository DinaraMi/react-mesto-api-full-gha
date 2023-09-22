class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInformation() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }
  editUserInformation(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._checkResponse);
  }
  
  editUserAvatar(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponse);
  }
  addCard(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
      .then(this._checkResponse);
  }
  addLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }
  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }
}
const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  baseUrl: 'http://localhost:3000',
  headers: {
    // authorization: '86b65609-2127-4100-b7d2-3912cfe7a894',
    'Content-Type': 'application/json'
  }
});
export default api;