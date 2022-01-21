import {
    userNameInput,
    userStatusInput,
    userName,
    userStatus,
    cardPopup
} from './data.js'

// Плавно открыть попап редактирования профиля
function openPopup(popupName){
    popupName.classList.add('popup_opened')
    popupName.classList.remove('popup-smooth-closing') // Убираем класс, чтобы анимация плавности срабатывала только после открытия попапа
}

// Плавно закрыть попап
function closePopup(popupName){
    popupName.classList.remove('popup_opened')
    popupName.classList.add('popup-smooth-closing') // Добавляем класс, чтобы анимация плавности срабатывала только после открытия попапа
}

// Парсить информацию о юзере в value инпутов формы редактирования профиля
function parseUserInfo() {
    userNameInput.value = userName.textContent
    userStatusInput.value = userStatus.textContent
}

// Открыть попап с изображением
function openCardPopup(evt){
    openPopup(cardPopup)

    cardPopup.querySelector('.popup__image').src = evt.target.closest('.card__image').src
    cardPopup.querySelector('.popup__image').alt = evt.target.nextElementSibling.textContent

    cardPopup.querySelector('.popup__description').textContent = evt.target.nextElementSibling.textContent
}

// Закрытие попапа на Esc
function handleEscPopupClose(evt) {
    if (evt.keyCode === 27 && document.querySelector('.popup_opened')) {
        closePopup(document.querySelector('.popup_opened'))
    }
}

// Закрытие попапа на оверлей
function handleOverlayPopupClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target)
    }
}

export { openPopup, closePopup, openCardPopup, parseUserInfo, handleEscPopupClose, handleOverlayPopupClose }