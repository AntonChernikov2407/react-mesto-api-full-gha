class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) { // Получает данные ответа
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  patchUserInfo({name, about}) { // Запрос на обновление информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._getResponseData(res))
  }

  postNewCard({name, link}) { // Запрос на добавление новой карточки
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) { // Запрос на удаление карточки
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, notLiked) { // Запрос на изменение состояния кнопки лайка
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${notLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  patchUserAvatar(avatar) { // Запрос на обновление аватара
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._getResponseData(res));
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto.anton-chernikov.nomoredomains.work',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;