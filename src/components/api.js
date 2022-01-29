// ИМПОРТ ИЗ UTIL.JS
import {
    userNameInput,
    userStatusInput,
    cardNameInput,
    cardLinkInput,
    avatarLinkInput,
    cohortId,
    token,
} from './utils.js'
import {createCard, renderCard} from "./card";

// КОНФИГ ДЛЯ ЗАПРОСОВ
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        'authorization': token,
        'Content-Type': 'application/json'
    }
}

// ПРОВЕРИТЬ ОТВЕТ
const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

// ОТПРАВИТЬ ЗАПРОС
const sendRequest = (url, method, body = null) => {
    return fetch(`${config.baseUrl}/${url}`, {
        method: method,
        headers: config.headers,
        body: body
    })
        .then(res => getResponseData(res))
}

// ПОЛУЧИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
const getUserInfo = () => {
    return sendRequest(`users/me`, 'GET')
}

// ПОЛУЧИТЬ КАРТОЧКИ
const getInitialCards = () => {
    return sendRequest(`cards`, 'GET')
}

// ОБНОВИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
const updateUserInfo = () => {
    const body = JSON.stringify({
    name: userNameInput.value,
    about: userStatusInput.value
    })
    return sendRequest(`users/me`, 'PATCH', body)
}

// ОБНОВИТЬ АВАТАР ЮЗЕРА
const updateAvatar = () => {
    const body = JSON.stringify({
        avatar: avatarLinkInput.value
    })
    return sendRequest(`users/me/avatar`, 'PATCH', body)
}

// ЗАГРУЗИТЬ КАРТОЧКУ
const loadCard = () => {
    const body = JSON.stringify({
        name: cardNameInput.value,
        link: cardLinkInput.value
    })
    return sendRequest(`cards`, 'POST', body)
}

// УДАЛИТЬ КАРТОЧКУ
const deleteCard = (cardId) => {
    return sendRequest(`cards/${cardId}`, 'DELETE')
}

// ДОБАВИТЬ ЛАЙК КАРТОЧКЕ
const addLikeCard = (cardId) => {
    return sendRequest(`cards/likes/${cardId}`, `PUT`)
}

// УБРАТЬ ЛАЙК У КАРТОЧКИ
const removeLikeCard = (cardId) => {
    return sendRequest(`cards/likes/${cardId}`, `DELETE`)
}

// ЭКСПОРТ
export {
    getUserInfo,
    getInitialCards,
    updateUserInfo,
    updateAvatar,
    loadCard,
    deleteCard,
    addLikeCard,
    removeLikeCard
}