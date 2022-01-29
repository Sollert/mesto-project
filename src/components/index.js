// ИМПОРТ INDEX.JSS
import '../pages/index.css'
// ИМПОРТ UTILS.JS
import {
    popupEditProfile,
    buttonOpenPopupEditProfile,
    buttonClosePopupEditProfile,
    formEditProfile,
    userNameInput,
    userStatusInput,
    userName,
    userStatus,
    editProfileSaveButton,
    cardsContainer,
    popupAddCard,
    buttonOpenPopupAddCard,
    buttonClosePopupAddCard,
    addCardForm,
    cardPopup,
    cardPopupCloseButton,
    userAvatar,
    avatarPopup,
    buttonOpenAvatarPopup,
    buttonCloseAvatarPopup,
    addCardSaveButton,
    editAvatarSaveButton,
    editAvatarForm, avatarLinkInput
} from './utils.js'
// ИМПОРТ MODAL.JS
import {
  openPopup,
  closePopup,
  handleOverlayPopupClose,
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

// ЗАГРУЗИТЬ НА СТРАНИЦУ ИНФО ЮЗЕРА
const loadUserInfo = () => {
  getUserInfo()
      .then((res) => {
        userName.textContent = res.name
        userStatus.textContent = res.about
      })
      .catch((err) => {
          console.log(`Ошибка: ${err}`);
      })
}

// ЗАГРУЗИТЬ НА СТРАНИЦУ АВАТАР
const loadUserAvatar = () => {
  getUserInfo()
      .then((res) => {
          userAvatar.src = res.avatar
      })
      .catch((err) => {
          console.log(`Ошибка: ${err}`);
      })
}

// ЗАГРУЗИТЬ НА СТРАНИЦУ КАРТОЧКИ
const loadCards = (cardsList) => {
  cardsList.reverse()
  cardsList.forEach(card => {
    renderCard(cardsContainer, createCard(card.name, card.link, card.likes, card._id, card.owner._id))
  })
}

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
            loadUserInfo(); // Загрузить информацию о пользователе
            loadUserAvatar() // Загрузить аватар пользователя
            loadCards(cardsList) // Загрузить карточки
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
}
loadAllInfo()


// СЛУШАТЕЛИ
const listeners = () => {

    // ДОБАВИТЬ КАРТОЧКУ
    addCardForm.addEventListener('submit', () => {
        addCardSaveButton.textContent = 'Сохранение...'
        addCard()
    })

    // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
    formEditProfile.addEventListener('submit', (evt) => {
        editProfileSaveButton.textContent = 'Сохранение...'
        updateUserInfo()
            .then((res) => {
                userName.textContent = userNameInput.value
                userStatus.textContent = userStatusInput.value
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                editProfileSaveButton.textContent = 'Сохранить'
            })
        closePopup(popupEditProfile)
    })

    // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ ОБНОВИТЬ АВАТАР
    editAvatarForm.addEventListener('submit', (evt) => {
        editAvatarSaveButton.textContent = 'Сохранение...'
        updateAvatar()
            .then((res) => {
                userAvatar.src = loadUserAvatar()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                editAvatarSaveButton.textContent = 'Сохранить'
            })
        editAvatarForm.reset()
        closePopup(avatarPopup)
        disableButton(editAvatarSaveButton, 'form__save-button_disabled')
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

    // ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
    // По клику на крестик
    buttonClosePopupEditProfile.addEventListener('click', function () {
        closePopup(popupEditProfile)
        putUserInfo()
    })
    // По клику на оверлей
    popupEditProfile.addEventListener('mousedown', handleOverlayPopupClose)

    // ЗАКРЫТЬ ПОПАП ЗАГРУЗКИ КАРТОЧКИ
    // По клику на крестик
    buttonClosePopupAddCard.addEventListener('click', function () {
        closePopup(popupAddCard)
        addCardForm.reset()
    })
    // По клику на оверлей
    popupAddCard.addEventListener('mousedown', handleOverlayPopupClose)

    // ЗАКРЫТЬ ПОПАП С ИЗОБРАЖЕНИЕМ
    // По клику на крестик
    cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup))
    // По клику на оверлей
    cardPopup.addEventListener('mousedown', handleOverlayPopupClose)


    // ЗАКРЫТЬ ПОПАП РЕДКАТИРОВАНИЯ АВАТАРА
    // По клику на крестик
    buttonCloseAvatarPopup.addEventListener('click', () => closePopup(avatarPopup))
    // По клику на оверлей
    avatarPopup.addEventListener('mousedown', handleOverlayPopupClose)
}
listeners()

// ЭКСПОРТ
export {
  userId
}