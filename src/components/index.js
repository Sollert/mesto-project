// ИМПОРТ INDEX.JSS
import '../pages/index.css'
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
    popups
} from './constants.js'
// ИМПОРТ MODAL.JS
import {
  openPopup,
  closePopup,
} from './modal.js'
// ИМПОРТ CARDS.JS
import {
    createCard,
    renderCard,
    addCard
} from './card.js'
// ИМПОРТ VALIDATE.JS
import {
    disableButton,
    enableValidation
} from './validate.js'
// ИМПОРТ API.JS
import {
    getUserInfo,
    getInitialCards,
    updateUserInfo,
    updateAvatar
} from './api.js'

let userId

// ВАЛИДАЦИЯ ФОРМ
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__element',
  inputInvalidClass: 'form__element_invalid',
  errorClass: 'error-message_active',
  buttonSelector: '.form__save-button',
  buttonDisabledClass: 'form__save-button_disabled'
})

// ПОДСТАВЛЯТЬ В VALUE ФОРМЫ ЮЗЕРА АКТУАЛЬНЫЕ ДАННЫЕ
const putUserInfo = () => {
  userNameInput.value = userName.textContent
  userStatusInput.value = userStatus.textContent
}

// ОТОБРАЗИТЬ ДАННЫЕ С СЕРВЕРА НА СТРАНИЦУ
const loadAllInfo = () => {
    Promise.all([getUserInfo(), getInitialCards()])
        .then(([user, cardsList]) => {
            userId = user._id
            userName.textContent = user.name
            userStatus.textContent = user.about
            userAvatar.src = user.avatar
            cardsList.reverse()
            cardsList.forEach(card => {
                renderCard(cardsContainer, createCard(card.name, card.link, card.likes, card._id, card.owner._id))
            })
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
}
loadAllInfo()

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