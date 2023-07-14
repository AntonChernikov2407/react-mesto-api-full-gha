export const BASE_URL = 'https://api.mesto.anton-chernikov.nomoredomains.work';

export const getResponseData = (res) => { // Получает данные ответа
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(res => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => getResponseData(res));
};

const getUserInfo = (token) => { // Запрос на получение информации о пользователе
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => getResponseData(res))
  .then(info => info)
  .catch(err => console.log(err));
}

const getInitialCards = (token) => { // Запрос на получение всех карточек
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => getResponseData(res))
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

export const getContent = (token) => {
  // return fetch(`${BASE_URL}/users/me`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   }
  // })
  // .then(res => getResponseData(res));

  return Promise.all([getUserInfo(token), getInitialCards(token)])
      .then(res => res);
}