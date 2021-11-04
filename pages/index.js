// Открытие окна редактирования профиля по клику на кнопку редактирования профиля
const buttonOpenEditProfile = document.querySelector('.user__edit-button');
buttonOpenEditProfile.addEventListener('click', function(){
  editProfilePopup.classList.add('popup_opened')
})

// Закрытие окна редактирования профиля по клику на крестик
const buttonCloseEditProfile = editProfilePopup.querySelector('.popup__close-button')
buttonCloseEditProfile.addEventListener('click', function(){
  editProfilePopup.classList.remove('popup_opened')
})