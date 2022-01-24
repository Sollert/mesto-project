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
  saveButton,
  cardPopupCloseButton, cardNameInput, cardLinkInput
} from './utils.js'

import {
  openPopup,
  closePopup,
  handleEscPopupClose,
  handleOverlayPopupClose
} from './modal.js'

import {
  createCard,
  renderCard
} from './card.js'

import {
  enableValidation,
  disableButton
} from './validate.js'

import '../pages/index.css'

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

// Добавить карточку в список карточек
function addCard(evt){
  evt.preventDefault()
  renderCard(cards, createCard(cardNameInput.value, cardLinkInput.value) );

  closePopup(popupAddCard)
  addCardForm.reset()
  disableButton(saveButton, 'form__save-button_disabled')
}

// Парсить информацию о юзере в value инпутов формы редактирования профиля
function parseUserInfo() {
  userNameInput.value = userName.textContent
  userStatusInput.value = userStatus.textContent
}


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
// По клику на оверлей
popupEditProfile.addEventListener('click', handleOverlayPopupClose)

// Закрыть попап загрузки карточки
// По клику на крестик
buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard)
  addCardForm.reset()
})
// По клику на оверлей
popupAddCard.addEventListener('click', handleOverlayPopupClose)

// Закрыть попап с изображением
// По клику на крестик
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup))
// По клику на оверлей
cardPopup.addEventListener('click', handleOverlayPopupClose)

// Добавить карточку
addCardForm.addEventListener('submit', addCard)