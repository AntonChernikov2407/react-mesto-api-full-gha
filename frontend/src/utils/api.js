

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

  getUserInfo() { // Запрос на получение информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
    .then(info => info)
    .catch(err => console.log(err));
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

  getInitialCards() { // Запрос на получение всех карточек
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
    .then((data) => {
      const result = data.map((card) => ({
        id: card._id,
        name: card.name,
        link: card.link,
        likes: card.likes,
        owner: card.owner
      }));
      return result;
    })
    .catch(err => console.log(err));
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(res => res);
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '00d3b65e-bd00-4c6d-a214-4372f39633e0',
    'Content-Type': 'application/json'
  }
});

export default api;