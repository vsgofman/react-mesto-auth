import React from 'react';
import apiConfig from './Utils';

class Api extends React.Component {
  constructor(props) {
    super(props);
    this._url = this.props.url;
    this._headers = this.props.headers;
  }

  setHeaderToken(token) {
    this._headers = { ...this._headers, Authorization: `Bearer ${token}` };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  getProfile() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

  editProfile(name, about) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  editAvatar(url) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    })
  }

  addCard(name, link) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
  }
}

const api = new Api(apiConfig);
export default api;