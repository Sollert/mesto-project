// ИМПОРТ INDEX.CSS
import '../pages/index.css'
// ИМПОРТЫ КЛАССОВ
import Api from './Api.js'
import Card from './Card.js'
import Popup from './Popup.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js'
import UserInfo from './UserInfo.js'
import FormValidation from './FormValidation.js'
// ИМПОРТ CONSTANTS.JS
import {
    popupEditProfile,
    buttonOpenPopupEditProfile,
    formEditProfile,
    userNameInput,
    userStatusInput,
    userName,
    userStatus,
    editProfileSaveButton,
    cardsContainer,
    popupAddCard,
    buttonOpenPopupAddCard,
    addCardForm,
    userAvatar,
    avatarPopup,
    buttonOpenAvatarPopup,
    addCardSaveButton,
    editAvatarSaveButton,
    editAvatarForm,
    avatarLinkInput,
    popups,
    configApi,
    configValidation,
    templateSelector
} from './constants.js'

let userId = '73716017333b67513d746598' // Сейчас нужен для хардкода, после того как будем доставать юзеринфо удалить

// ОБЪЯВИТЬ ЭКЗЕМПЛЯР АПИ ДЛЯ ВСЕГО
const api = new Api(configApi)

// СОБЫТИЯ ДЛЯ КАРТОЧКИ
// Открыть попап с изображением
const handleCardClick = () => {

}

// Удалить карточку
const handleRemoveCard = () => {

}

// Лайк
const addLike = (card, cardId) => {
    const cardLike = card.querySelector('.card__like')
    const likeCounter = card.querySelector('.card__like-count')

    api.addLikeCard(cardId)
        .then((data) => {
            cardLike.classList.add('card__like_active')
            likeCounter.textContent = data.likes.length;
        })
}

// Дизлайк
const removeLike = (card, cardId) => {
    const cardLike = card.querySelector('.card__like')
    const likeCounter = card.querySelector('.card__like-count')

    api.removeLikeCard(cardId)
        .then((data) => {
            cardLike.classList.remove('card__like_active')
            likeCounter.textContent = data.likes.length;
        })
}

// ОБЪЯИТЬ ЭКЗЕМПЛЯР SECTION ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК В РАЗМЕТКУ
const cardList = new Section((data) => renderCard(data), '.cards');

// РЕНДЕР КАРТОЧЕК
const renderCard = (data) => {
    const card = new Card(data, templateSelector, handleCardClick, handleRemoveCard, addLike, removeLike)
    const cardElement = card.generate(userId)
    cardList.setItem(cardElement)
}

// ОТОБРАЗИТЬ ДАННЫЕ С СЕРВЕРА НА СТРАНИЦУ
const loadAllInfo = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cardsList]) => {
            userName.textContent = user.name
            userStatus.textContent = user.about
            userAvatar.src = user.avatar

            cardsList.reverse()
            cardsList.forEach(card => {
                renderCard(card)
                console.log(card)
            })
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
}
loadAllInfo()

// ПОДСТАВЛЯТЬ В VALUE ФОРМЫ ЮЗЕРА АКТУАЛЬНЫЕ ДАННЫЕ
const putUserInfo = () => {
    userNameInput.value = userName.textContent
    userStatusInput.value = userStatus.textContent
}

// СЛУШАТЕЛИ
const setListeners = () => {

    // ДОБАВИТЬ КАРТОЧКУ
    addCardForm.addEventListener('submit', () => {
        addCardSaveButton.textContent = 'Сохранение...'
        addCard()
    })

    // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
    formEditProfile.addEventListener('submit', (evt) => {
        editProfileSaveButton.textContent = 'Сохранение...'
        updateUserInfo(userNameInput.value, userStatusInput.value)
            .then((res) => {
                userName.textContent = userNameInput.value
                userStatus.textContent = userStatusInput.value
                closePopup(popupEditProfile)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                editProfileSaveButton.textContent = 'Сохранить'
            })
    })

    // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ ОБНОВИТЬ АВАТАР
    editAvatarForm.addEventListener('submit', (evt) => {
        editAvatarSaveButton.textContent = 'Сохранение...'
        updateAvatar(avatarLinkInput.value)
            .then((res) => {
                userAvatar.src = res.avatar
                editAvatarForm.reset()
                closePopup(avatarPopup)
                disableButton(editAvatarSaveButton, 'form__save-button_disabled')
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                editAvatarSaveButton.textContent = 'Сохранить'
            })
    })

    // ОТКРЫТЬ ПОПАП ПРОФИЛЯ
    buttonOpenPopupEditProfile.addEventListener('click', () => {
        openPopup(popupEditProfile)
        putUserInfo()
    })

    // ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
    buttonOpenAvatarPopup.addEventListener('click', () => openPopup(avatarPopup))

    // ОТКРЫТЬ ПОПАП ЗАГРУЗКИ КАРТОЧКИ
    buttonOpenPopupAddCard.addEventListener('click', () => openPopup(popupAddCard))

    // ЗАКРЫТЬ ПОПАПЫ
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
}
setListeners()

// ЭКСПОРТ
export {
  userId
}