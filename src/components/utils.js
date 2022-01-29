const profile = document.querySelector('.profile') // Профиль
const popupEditProfile = document.querySelector('#popup-edit-profile') // Попап редактирования профиля

const buttonOpenPopupEditProfile = profile.querySelector('.user__edit-button'); // Кнопка открыть попап редактирования профиля
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button') // Кнопка закрыть попап редактирования профиля

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
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button') // Кнопка закрыть попап загрузки карточки
const addCardSaveButton = popupAddCard.querySelector('.form__save-button') // Кнопка сохранения

const addCardForm = popupAddCard.querySelector('.form') // Форма загрузки карточки
const cardNameInput = popupAddCard.querySelector('[name = cardname]') // Инпут названия карточки в форме
const cardLinkInput = popupAddCard.querySelector('[name = cardlink]') // Инпут ссылки на изображение карточке в форме

const cardPopup = document.querySelector('#card-popup')
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button')
const cardPopupImage = cardPopup.querySelector('.popup__image')
const cardPopupDescription = cardPopup.querySelector('.popup__description')

const buttonOpenAvatarPopup = profile.querySelector('.user__avatar-overlay')
const avatarPopup = document.querySelector('#avatar-popup')
const buttonCloseAvatarPopup = avatarPopup.querySelector('.popup__close-button')
const avatarLinkInput = avatarPopup.querySelector('.form__element')
const editAvatarForm = avatarPopup.querySelector('.form')
const editAvatarSaveButton = editAvatarForm.querySelector('.form__save-button')

const cohortId = 'plus-cohort-6'
const token = '0e574467-6b7d-4dc4-b2a8-eccc9934d3db'


export {
    profile,
    popupEditProfile,
    buttonOpenPopupEditProfile,
    buttonClosePopupEditProfile,
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
    buttonClosePopupAddCard,
    addCardForm,
    cardNameInput,
    cardLinkInput,
    cardPopup,
    cardPopupCloseButton,
    cardPopupImage,
    cardPopupDescription,
    addCardSaveButton,
    avatarPopup,
    buttonOpenAvatarPopup,
    buttonCloseAvatarPopup,
    avatarLinkInput,
    editAvatarForm,
    editAvatarSaveButton,
    cohortId,
    token
}