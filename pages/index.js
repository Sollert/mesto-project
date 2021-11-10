const profile = document.querySelector('.profile') // Объявляем переменную профиля
const popupEditProfile = document.querySelector('#popup-edit-profile') // Объявляем переменную попапа редактирования профиля
const popupAddCard = document.querySelector('#popup-add-card') // Объявляем переменную попапа добавления карточки

// Реализуем открытие окна редактирования профиля по клику на кнопку редактирования профиля
const buttonOpenPopupEditProfile = profile.querySelector('.user__edit-button');
buttonOpenPopupEditProfile.addEventListener('click', function(){
  popupEditProfile.classList.add('popup_opened')
  popupEditProfile.classList.remove('popup-smooth-closing')
})

// Реализуем закрытие окна редактирования профиля по клику на крестик
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button')
buttonClosePopupEditProfile.addEventListener('click', function(){
  popupEditProfile.classList.remove('popup_opened')
  popupEditProfile.classList.add('popup-smooth-closing')
})

// Подставляем в value инпутов редактирования профиля значения со страницы
const editProfileForm = popupEditProfile.querySelector('.form')
const userNameInput = editProfileForm.querySelector('[name = username]')
const userStatusInput = editProfileForm.querySelector('[name = userstatus]')
const userName = profile.querySelector('.user__name')
const userStatus = profile.querySelector('.user__status')

function parseUserName() {
  userNameInput.value = userName.textContent
  userStatusInput.value = userStatus.textContent
}

parseUserName()

// Реализуем сохранение исходных значений value инпутов при закрытии попапа
buttonClosePopupEditProfile.addEventListener('click', parseUserName)


// Реализуем сохранение данных из формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userStatus.textContent = userStatusInput.value;
  popupEditProfile.classList.remove('popup_opened')
}

editProfileForm.addEventListener('submit', formSubmitHandler);


// Шесть карточек «из коробки»
const cards = document.querySelector('.cards')
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

initialCards.forEach(function(name, i){
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  
  card.querySelector('.card__image').src = initialCards[i].link;
  card.querySelector('.card__image').alt = initialCards[i].name;
  card.querySelector('.card__image').addEventListener('click', openCardPopup)

  card.querySelector('.card__name').textContent = initialCards[i].name;

  card.querySelector('.card__like').type = 'button';
  card.querySelector('.card__like').ariaLabel = 'Нравится';
  card.querySelector('.card__like').addEventListener('click', likeCard)

  card.querySelector('.card__delete').type = 'button';
  card.querySelector('.card__delete').ariaLabel = 'Удалить';
  card.querySelector('.card__delete').addEventListener('click', deleteCard)

  cards.prepend(card)
})


// Реализуем открытие окна добавления карточки по клику на кнопку редактирования профиля
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button')
buttonOpenPopupAddCard.addEventListener('click', function(){
  popupAddCard.classList.add('popup_opened')
  popupAddCard.classList.remove('popup-smooth-closing')
})

// Реализуем закрытие окна добавления карточки по клику на крестик
const butttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button')
butttonClosePopupAddCard.addEventListener('click', function(){
  popupAddCard.classList.remove('popup_opened')
  popupAddCard.classList.add('popup-smooth-closing')
})

// Реализуем добавление карточки через форму
const addCardForm = popupAddCard.querySelector('.form')
const cardNameInput = popupAddCard.querySelector('[name = cardname]')
const cardLinkInput = popupAddCard.querySelector('[name = cardlink]')

function addCard(evt){
  evt.preventDefault()

  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  
  card.querySelector('.card__image').src = cardLinkInput.value;
  card.querySelector('.card__image').alt = cardNameInput.value;
  card.querySelector('.card__image').addEventListener('click', openCardPopup)

  card.querySelector('.card__name').textContent = cardNameInput.value;

  card.querySelector('.card__like').type = 'button';
  card.querySelector('.card__like').ariaLabel = 'Нравится';
  card.querySelector('.card__like').addEventListener('click', likeCard)

  card.querySelector('.card__delete').type = 'button';
  card.querySelector('.card__delete').ariaLabel = 'Удалить';
  card.querySelector('.card__delete').addEventListener('click', deleteCard)

  cards.prepend(card)

  popupAddCard.classList.remove('popup_opened')
  cardLinkInput.value = ''
  cardNameInput.value = ''
}

addCardForm.addEventListener('submit', addCard)


// Функция для реализации возможности ставить лайки
function likeCard(evt){
  evt.target.classList.toggle('card__like_active')
}


// Функция для реализации удаления карточек
function deleteCard(evt){
  evt.target.closest('.card').remove()
}

// Функция открытия попапа с изображением по нажатию на картинку
function openCardPopup(evt){
  let cardPopup = document.querySelector('.card-popup')

  cardPopup.classList.add('card-popup_opened')
  cardPopup.classList.remove('popup-smooth-closing')

  cardPopup.querySelector('.card-popup__image').src = evt.target.closest('.card__image').src
  cardPopup.querySelector('.card-popup__image').alt = evt.target.nextElementSibling.textContent

  cardPopup.querySelector('.card-popup__description').textContent = evt.target.nextElementSibling.textContent
}

// Функция закрытия попапа с изображением по нажатию на крестик
let cardPopup = document.querySelector('.card-popup')
const cardPopupCloseButton = cardPopup.querySelector('.card-popup__close-button')

cardPopupCloseButton.addEventListener('click', function(){
  cardPopup.classList.remove('card-popup_opened')
  cardPopup.classList.add('popup-smooth-closing')
})