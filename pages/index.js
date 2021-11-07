const profile = document.querySelector('.profile') // Объявляем переменную профиля
const editProfilePopup = document.querySelector('#editProfilePopup') // Объявляем переменную попапа редактирования профиля
const addCardPopup = document.querySelector('#addCardPopup') // Объявляем переменную попапа добавления карточки

// Реализуем открытие окна редактирования профиля по клику на кнопку редактирования профиля
const buttonOpenEditProfilePopup = profile.querySelector('.user__edit-button');
buttonOpenEditProfilePopup.addEventListener('click', function(){
  editProfilePopup.classList.add('popup_opened')
})

// Реализуем закрытие окна редактирования профиля по клику на крестик
const buttonCloseEditProfilePopup = editProfilePopup.querySelector('.popup__close-button')
buttonCloseEditProfilePopup.addEventListener('click', function(){
  editProfilePopup.classList.remove('popup_opened')
})

// Подставляем в value инпутов редактирования профиля значения со страницы
const editProfileForm = editProfilePopup.querySelector('.form')
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
buttonCloseEditProfilePopup.addEventListener('click', parseUserName)


// Реализуем сохранение данных из формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userStatus.textContent = userStatusInput.value;
  editProfilePopup.classList.remove('popup_opened')
}

editProfileForm.addEventListener('submit', formSubmitHandler);


// Шесть карточек «из коробки»
const cards = document.querySelector('.cards')
const initialCards = [
  {
    name: 'Медведь',
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

for(i = 0; i < initialCards.length; i++){
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  
  card.querySelector('.card__image').src = initialCards[i].link;
  card.querySelector('.card__image').alt = initialCards[i].name;

  card.querySelector('.card__name').textContent = initialCards[i].name;

  card.querySelector('.card__like').type = 'button';
  card.querySelector('.card__like').ariaLabel = 'Нравится';
  card.querySelector('.card__like').addEventListener('click', likeCard)

  card.querySelector('.card__delete').type = 'button';
  card.querySelector('.card__delete').ariaLabel = 'Удалить';
  card.querySelector('.card__delete').addEventListener('click', deleteCard)

  cards.prepend(card)
}


// Реализуем открытие окна добавления карточки по клику на кнопку редактирования профиля
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button')
buttonOpenAddCardPopup.addEventListener('click', function(){
  addCardPopup.classList.add('popup_opened')
})

// Реализуем закрытие окна добавления карточки по клику на крестик
const butttonCloseAddCardPopup = addCardPopup.querySelector('.popup__close-button')
butttonCloseAddCardPopup.addEventListener('click', function(){
  addCardPopup.classList.remove('popup_opened')
})

// Реализуем добавление карточки через форму
const addCardForm = addCardPopup.querySelector('.form')
const cardNameInput = addCardPopup.querySelector('[name = cardname]')
const cardLinkInput = addCardPopup.querySelector('[name = cardlink]')

function addCard(evt){
  evt.preventDefault()

  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  
  card.querySelector('.card__image').src = cardLinkInput.value;
  card.querySelector('.card__image').alt = cardNameInput.value;

  card.querySelector('.card__name').textContent = cardNameInput.value;

  card.querySelector('.card__like').type = 'button';
  card.querySelector('.card__like').ariaLabel = 'Нравится';
  card.querySelector('.card__like').addEventListener('click', likeCard)

  card.querySelector('.card__delete').type = 'button';
  card.querySelector('.card__delete').ariaLabel = 'Удалить';
  card.querySelector('.card__delete').addEventListener('click', deleteCard)

  cards.prepend(card)
  
  addCardPopup.classList.remove('popup_opened')
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