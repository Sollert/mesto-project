import {
    cardPopup,
    cardPopupImage,
    cardPopupDescription
} from './utils.js'

// Плавно открыть попап редактирования профиля
function openPopup(popupName){
    document.addEventListener('keydown', handleEscPopupClose);
    popupName.classList.add('popup_opened')
    popupName.classList.remove('popup-smooth-closing') // Убираем класс, чтобы анимация плавности срабатывала только после открытия попапа
}

// Плавно закрыть попап
function closePopup(popupName){
    popupName.classList.remove('popup_opened')
    popupName.classList.add('popup-smooth-closing') // Добавляем класс, чтобы анимация плавности срабатывала только после открытия попапа
    document.removeEventListener('keydown', handleEscPopupClose);
}

// Открыть попап с изображением
function openCardPopup(evt){
    openPopup(cardPopup)
    document.addEventListener('keydown', handleEscPopupClose);

    cardPopupImage.src = evt.target.closest('.card__image').src
    cardPopupImage.alt = evt.target.nextElementSibling.textContent

    cardPopupDescription.textContent = evt.target.nextElementSibling.textContent
}

// Закрытие попапа на Esc
function handleEscPopupClose(evt) {
    if (evt.key=== "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Закрытие попапа на оверлей
function handleOverlayPopupClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target)
    }
}

export { openPopup, closePopup, openCardPopup, handleEscPopupClose, handleOverlayPopupClose }