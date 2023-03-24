// auth.js

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  // Регистрация

  register({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this._checkResponse)

  };

  // Авторизация
  authorize({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          return data
        }
      })
  }

  // Получаем контект о юзере
  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then(data => data)
  }
}

// Экземпляр с аутентификацией
export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
});
