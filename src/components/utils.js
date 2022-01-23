const profile = document.querySelector('.profile') // Профиль
const popupEditProfile = document.querySelector('#popup-edit-profile') // Попап редактирования профиля

const buttonOpenPopupEditProfile = profile.querySelector('.user__edit-button'); // Кнопка открыть попап редактирования профиля
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button') // Кнопка закрыть попап редактирования профиля

const formEditProfile = popupEditProfile.querySelector('.form') // Форма редактирования профиля
const userNameInput = formEditProfile.querySelector('[name = username]') // Инпут имени пользователя в форме редактирования профиля
const userStatusInput = formEditProfile.querySelector('[name = userstatus]') // Инпут статуса пользователя в форме редактирования профиля
const userName = profile.querySelector('.user__name') // Имя пользователя
const userStatus = profile.querySelector('.user__status') // Статус пользователя

const cards = document.querySelector('.cards') // Контейнер карточек
const initialCards = [
    {
        name: 'Мишка',
        link: 'https://images.unsplash.com/photo-1576076819613-26f8537ae375?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Котик',
        link: 'https://images.unsplash.com/photo-1588418306237-48715b51ede9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
    },
];

const popupAddCard = document.querySelector('#popup-add-card') // Попап загрузки карточки
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button') // Кнопка открыть попап загрузки карточки
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button') // Кнопка закрыть попап загрузки карточки

const addCardForm = popupAddCard.querySelector('.form') // Форма загрузки карточки
const cardNameInput = popupAddCard.querySelector('[name = cardname]') // Инпут названия карточки в форме
const cardLinkInput = popupAddCard.querySelector('[name = cardlink]') // Инпут ссылки на изображение карточке в форме

const cardPopup = document.querySelector('#card-popup')
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button')
const cardPopupImage = cardPopup.querySelector('.popup__image')
const cardPopupDescription = cardPopup.querySelector('.popup__description')

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
    cards,
    initialCards,
    popupAddCard,
    buttonOpenPopupAddCard,
    buttonClosePopupAddCard,
    addCardForm,
    cardNameInput,
    cardLinkInput,
    cardPopup,
    cardPopupCloseButton,
    cardPopupImage,
    cardPopupDescription
}