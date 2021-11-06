const profile = document.querySelector('.profile') // Объявляем переменную профиля
const editProfilePopup = document.querySelector('#editProfilePopup') // Объявляем переменную попапа редактирования профиля

// Реализуем открытие окна редактирования профиля по клику на кнопку редактирования профиля
const buttonOpenEditProfile = profile.querySelector('.user__edit-button');
buttonOpenEditProfile.addEventListener('click', function(){
  editProfilePopup.classList.add('popup_opened')
})

// Реализуем закрытие окна редактирования профиля по клику на крестик
const buttonCloseEditProfile = editProfilePopup.querySelector('.popup__close-button')
buttonCloseEditProfile.addEventListener('click', function(){
  editProfilePopup.classList.remove('popup_opened')
})

// Подставляем в value инпутов редактирования профиля значения со страницы
const userNameInput = editProfilePopup.querySelector('[name = username]')
const userStatusInput = editProfilePopup.querySelector('[name = userstatus]')
const userName = profile.querySelector('.user__name')
const userStatus = profile.querySelector('.user__status')

userNameInput.value = userName.textContent
userStatusInput.value = userStatus.textContent

// Реализуем сохранение исходных значений value инпутов при закрытии попапа, нажатием на крестик
buttonCloseEditProfile.addEventListener('click', function(){
  userNameInput.value = userName.textContent
  userStatusInput.value = userStatus.textContent
})