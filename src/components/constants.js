const profile = document.querySelector('.profile') // Профиль
const popupEditProfile = document.querySelector('#popup-edit-profile') // Попап редактирования профиля

const popups = document.querySelectorAll('.popup')

const buttonOpenPopupEditProfile = profile.querySelector('.user__edit-button'); // Кнопка открыть попап редактирования профиля

const formEditProfile = popupEditProfile.querySelector('.form') // Форма редактирования профиля
const userNameInput = formEditProfile.querySelector('[name = username]') // Инпут имени пользователя в форме редактирования профиля
const userStatusInput = formEditProfile.querySelector('[name = userstatus]') // Инпут статуса пользователя в форме редактирования профиля
const userName = profile.querySelector('.user__name') // Имя пользователя
const userStatus = profile.querySelector('.user__status') // Статус пользователя
const userAvatar = profile.querySelector('.user__avatar') // Аватар пользователя
const editProfileSaveButton = popupEditProfile.querySelector('.form__save-button')

const cardsContainer = document.querySelector('.cards') // Контейнер карточек

const popupAddCard = document.querySelector('#popup-add-card') // Попап загрузки карточки
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button') // Кнопка открыть попап загрузки карточки
const addCardSaveButton = popupAddCard.querySelector('.form__save-button') // Кнопка сохранения

const addCardForm = popupAddCard.querySelector('.form') // Форма загрузки карточки
const cardNameInput = popupAddCard.querySelector('[name = cardname]') // Инпут названия карточки в форме
const cardLinkInput = popupAddCard.querySelector('[name = cardlink]') // Инпут ссылки на изображение карточке в форме

const cardPopup = document.querySelector('#card-popup')
const cardPopupImage = cardPopup.querySelector('.popup__image')
const cardPopupDescription = cardPopup.querySelector('.popup__description')

const buttonOpenAvatarPopup = profile.querySelector('.user__avatar-overlay')
const avatarPopup = document.querySelector('#avatar-popup')
const avatarLinkInput = avatarPopup.querySelector('.form__element')
const editAvatarForm = avatarPopup.querySelector('.form')
const editAvatarSaveButton = editAvatarForm.querySelector('.form__save-button')

const config = {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-6`,
    headers: {
        'authorization': '0e574467-6b7d-4dc4-b2a8-eccc9934d3db',
        'Content-Type': 'application/json'
    }
}


export {
    profile,
    popupEditProfile,
    popups,
    buttonOpenPopupEditProfile,
    formEditProfile,
    userNameInput,
    userStatusInput,
    userName,
    userStatus,
    userAvatar,
    editProfileSaveButton,
    cardsContainer,
    popupAddCard,
    buttonOpenPopupAddCard,
    addCardForm,
    cardNameInput,
    cardLinkInput,
    cardPopup,
    cardPopupImage,
    cardPopupDescription,
    addCardSaveButton,
    avatarPopup,
    buttonOpenAvatarPopup,
    avatarLinkInput,
    editAvatarForm,
    editAvatarSaveButton,
    config
}