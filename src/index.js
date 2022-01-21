import {
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
  cardPopup,
  cardPopupCloseButton
} from './components/data.js'

import {
  openPopup,
  closePopup,
  parseUserInfo,
  handleEscPopupClose,
  handleOverlayPopupClose
} from './components/modal.js'

import {
  createCard,
  renderCard,
  addCard} from './components/card.js'

import {
  enableValidation
} from './components/validate.js'

import './pages/index.css'

// ПЕРЕМЕННЫЕ


// Загрузить шесть карточек из коробки
initialCards.forEach(function (name, i){
  renderCard(cards, createCard(initialCards[i].name, initialCards[i].link) )
})

// Валидация
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__element',
  inputInvalidClass: 'form__element_invalid',
  errorClass: 'error-message_active',
  buttonSelector: '.form__save-button',
  buttonDisabledClass: 'form__save-button_disabled'
})


// СЛУШАТЕЛИ
// Открыть попап с инфо профиля
buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  parseUserInfo()
})

// Открыть попап загрузки карточки
buttonOpenPopupAddCard.addEventListener('click', () => openPopup(popupAddCard))

// Сохранять данные из формы редактирования профиля по submit
formEditProfile.addEventListener('submit', function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userStatus.textContent = userStatusInput.value;
  closePopup(popupEditProfile)
});

// Закрыть попап с инфо профиля
// По крестику
buttonClosePopupEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
  parseUserInfo()
})
// По клавише Esc
document.addEventListener('keydown', handleEscPopupClose)
// По клику на оверлей
popupEditProfile.addEventListener('click', handleOverlayPopupClose)

// Закрыть попап загрузки карточки
// По клику на крестик
buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard)
  addCardForm.reset()
})
// По клавише Esc
document.addEventListener('keydown', handleEscPopupClose)
// По клику на оверлей
popupAddCard.addEventListener('click', handleOverlayPopupClose)

// Закрыть попап с изображением
// По клику на крестик
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup))
// По клавише Esc
document.addEventListener('keydown', handleEscPopupClose)
// По клику на оверлей
cardPopup.addEventListener('click', handleOverlayPopupClose)

// Добавить карточку
addCardForm.addEventListener('submit', addCard)