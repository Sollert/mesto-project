// ИМПОРТ UTILS.JS
import {
    cardPopup,
    cardPopupImage,
    cardPopupDescription
} from './constants.js'


// ОТКРЫТЬ ПОПАП
const openPopup = (popupName) => {
    document.addEventListener('keydown', handleEscPopupClose);
    popupName.classList.add('popup_opened')
    popupName.classList.remove('popup-smooth-closing') // Убираем класс, чтобы анимация плавности срабатывала только после открытия попапа
}

// ЗАКРЫТЬ ПОПАП
const closePopup = (popupName) => {
    popupName.classList.remove('popup_opened')
    popupName.classList.add('popup-smooth-closing') // Добавляем класс, чтобы анимация плавности срабатывала только после открытия попапа
    document.removeEventListener('keydown', handleEscPopupClose);
}

// ЗАКРЫТЬ ПОПАП КЛИКОМ НА ОВЕРЛЕЙ
const handleOverlayPopupClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target)
    }
}

// ОТКРЫТЬ ПОПАП ИЗОБРАЖЕНИЯ
const openCardPopup = (evt) => {
    openPopup(cardPopup)
    cardPopupImage.src = evt.target.src
    cardPopupImage.alt = evt.target.alt
    cardPopupDescription.textContent = evt.target.alt
}

// ЗАКРЫТЬ ПОПАП ИЗОБРАЖЕНИЯ
const handleEscPopupClose = (evt) => {
    if (evt.key=== "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}


// ЭКСПОРТ
export {
    openPopup,
    closePopup,
    openCardPopup,
    handleEscPopupClose,
    handleOverlayPopupClose
}