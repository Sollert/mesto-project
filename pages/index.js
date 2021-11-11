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


// Плавно открыть попап редактирования профиля
function openPopup(popupName){
  popupName.classList.add('popup_opened')
  popupName.classList.remove('popup-smooth-closing') // Убираем класс, чтобы анимация плавности срабатывала только после открытия попапа
}
buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile, 'popup_opened')
  parseUserInfo()
})


// Плавно закрыть попап редактирования профиля
function closePopup(popupName){
  popupName.classList.remove('popup_opened')
  popupName.classList.add('popup-smooth-closing') // Добавляем класс, чтобы анимация плавности срабатывала только после открытия попапа
}
buttonClosePopupEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile, 'popup_opened')
  parseUserInfo()
})


// Парсить информацию о юзере в value инпутов формы редактирования профиля
function parseUserInfo() {
  userNameInput.value = userName.textContent
  userStatusInput.value = userStatus.textContent
}


// Сохранять данные из формы редактирования профиля по submit
formEditProfile.addEventListener('submit', function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userStatus.textContent = userStatusInput.value;
  closePopup(popupEditProfile, 'popup_opened')
});


// Плавно открыть попап загрузки карточки
buttonOpenPopupAddCard.addEventListener('click', () => openPopup(popupAddCard, 'popup_opened'))


// Плавно закрыть попап загрузки карточки
buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard, 'popup_opened')
  addCardForm.reset()
})


// Поставить лайк карточке
function likeCard(evt){
  evt.target.classList.toggle('card__like_active')
}


// Удалить карточку
function deleteCard(evt){
  evt.target.closest('.card').remove()
}


// Открыть попап с изображением
function openCardPopup(evt){
  openPopup(cardPopup, 'card-popup_opened')

  cardPopup.querySelector('.popup__image').src = evt.target.closest('.card__image').src
  cardPopup.querySelector('.popup__image').alt = evt.target.nextElementSibling.textContent

  cardPopup.querySelector('.popup__description').textContent = evt.target.nextElementSibling.textContent
}


// Закрыть попап с изображением
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup))


// Создать карточку
function createCard(name, link){
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__name').textContent = name;
  card.querySelector('.card__image').src = link;

  card.querySelector('.card__image').addEventListener('click', openCardPopup)
  card.querySelector('.card__like').addEventListener('click', likeCard)
  card.querySelector('.card__delete').addEventListener('click', deleteCard)

  return card
}


// Добавление карточки в контейнер
function renderCard(container, element){
  container.prepend(element)
}


// Добавить карточку в список карточек
function addCard(evt){
  evt.preventDefault()
  renderCard(cards, createCard(cardNameInput.value, cardLinkInput.value) );

  closePopup(popupAddCard)
  addCardForm.reset()
}
addCardForm.addEventListener('submit', addCard)


// Загрузить шесть карточек из коробки
initialCards.forEach(function (name, i){
  renderCard(cards, createCard(initialCards[i].name, initialCards[i].link) )
})