export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl
        this._headers = config.headers
    }

    // ПРОВЕРИТЬ ОТВЕТ
    _getResponseData(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status}`)
    }

    // ОТПРАВИТЬ ЗАПРОС
    _sendRequest(url, method, body = null) {
        return fetch(`${this._baseUrl}/${url}`, {
            method: method,
            headers: this._headers,
            body: body
        })
            .then(this._getResponseData)
    }

    // ПОЛУЧИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
    getUserInfo() {
        return this._sendRequest(`users/me`, 'GET')
    }

    // ПОЛУЧИТЬ КАРТОЧКИ
    getInitialCards() {
        return this._sendRequest(`cards`, 'GET')
    }

    // ОБНОВИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
    updateUserInfo(name, about) {
        const body = JSON.stringify({
            name: name,
            about: about
        })
        return this._sendRequest(`users/me`, 'PATCH', body)
    }

    // ОБНОВИТЬ АВАТАР ЮЗЕРА
    updateAvatar(avatar) {
        const body = JSON.stringify({
            avatar: avatar
        })
        return this._sendRequest(`users/me/avatar`, 'PATCH', body)
    }

    // ЗАГРУЗИТЬ КАРТОЧКУ
    loadCard(name, link) {
        const body = JSON.stringify({
            name: name,
            link: link
        })
        return this._sendRequest(`cards`, 'POST', body)
    }

    // УДАЛИТЬ КАРТОЧКУ
    deleteCard(cardId) {
        return this._sendRequest(`cards/${cardId}`, 'DELETE')
    }

    // ДОБАВИТЬ ЛАЙК КАРТОЧКЕ
    addLikeCard(cardId) {
        return this._sendRequest(`cards/likes/${cardId}`, `PUT`)
    }

    // УБРАТЬ ЛАЙК У КАРТОЧКИ
    removeLikeCard(cardId) {
        return this._sendRequest(`cards/likes/${cardId}`, `DELETE`)
    }
}