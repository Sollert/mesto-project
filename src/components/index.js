// ИМПОРТ INDEX.CSS
import "../pages/index.css";
// ИМПОРТЫ КЛАССОВ
import Api from "./Api.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidation from "./FormValidation.js";
// ИМПОРТ CONSTANTS.JS
import { editProfileSaveButton, userNameInput, userStatusInput, userName, userStatus, buttonOpenPopupEditProfile, cardsContainer, popupAddCard, buttonOpenPopupAddCard, addCardForm, userAvatar, avatarPopup, buttonOpenAvatarPopup, addCardSaveButton, editAvatarSaveButton, editAvatarForm, avatarLinkInput, popups, configApi, configValidation, templateSelector } from "./constants.js";

// ОБЪЯВИТЬ ЭКЗЕМПЛЯР АПИ ДЛЯ ВСЕГО
const api = new Api(configApi);

// СОБЫТИЯ ДЛЯ КАРТОЧКИ
// Открыть попап с изображением
const handleCardClick = (link, description) => {
  popupWithImg.openPopup(link, description);
};

// Удалить карточку
const handleRemoveCard = (card) => {
  api.deleteCard(card.id)
};

// Лайк
const toggleLike = (card, data) => {
  card.cardLikeEl.classList.toggle("card__like_active");
  card.likeCounterEl.textContent = data.likes.length;
  card.isLiked = !card.isLiked;
};

const addLike = (card) => {
  api.addLikeCard(card.id).then((data) => {
    toggleLike(card, data);
  });
};

// Дизлайк
const removeLike = (card) => {
  api.removeLikeCard(card.id).then((data) => {
    toggleLike(card, data);
  });
};

// ЭКЗЕМПЛЯР ЮЗЕРИНФО
const userInfo = new UserInfo(".user__name", ".user__status", ".user__avatar");

// ОБЪЯИТЬ ЭКЗЕМПЛЯР SECTION ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК В РАЗМЕТКУ
const cardList = new Section((data) => renderCard(data), ".cards");

// РЕНДЕР КАРТОЧЕК
const renderCard = (data) => {
  const isOwner = checkIsOwner(data);
  const isLiked = checkIsLiked(data.likes);
  const card = new Card(data, templateSelector, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner, isLiked);
  cardList.setItem(card.generate());
};

// ПРОВЕРИТЬ ВЛАДЕЛЬЦА КАРТОЧКИ
const checkIsOwner = (card) => {
  return userInfo.getUserId() === card.owner._id;
};

const checkIsLiked = (likes) => {
  return likes.some((like) => like._id === userInfo.getUserId());
};

// ОТОБРАЗИТЬ ДАННЫЕ С СЕРВЕРА НА СТРАНИЦУ
const loadAllInfo = () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cardsList]) => {
      userInfo.id = user._id;
      userInfo.setUserInfo(user);
      cardsList.reverse();
      cardsList.forEach((card) => {
        renderCard(card);
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};
loadAllInfo();

//Валидация
const enableValidation = () => {
  const validation = new FormValidation({ obj: configValidation }, popups);

  popups.forEach((elem) => {
    validation.enableValidation(configValidation);
  });
};

enableValidation();

//Popup With Image
const popupWithImg = new PopupWithImage("#card-popup", ".popup__image", ".popup__description");
popupWithImg.setEventListeners();

//Popup with avatar

const handlePopupWithAvatar = (object) => {
  editAvatarSaveButton.textContent = "Сохранение...";
  api
    .updateAvatar(object.avatarLink)
    .then((res) => {
      userAvatar.src = res.avatar;
      popupWithAvatar.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editAvatarSaveButton.textContent = "Сохранить";
    });
};

const popupWithAvatar = new PopupWithForm("#avatar-popup", handlePopupWithAvatar);
popupWithAvatar.setEventListeners();

//Popup Edit Profile
const handlePopupWithProfile = (object) => {
  editProfileSaveButton.textContent = "Сохранение...";
  api
    .updateUserInfo(object.username, object.userstatus)
    .then((res) => {
      userName.textContent = res.name;
      userStatus.textContent = res.about;
      popupEditProfile.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editProfileSaveButton.textContent = "Сохранить";
    });
};
const popupEditProfile = new PopupWithForm("#popup-edit-profile", handlePopupWithProfile);
popupEditProfile.setEventListeners();

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
buttonOpenAvatarPopup.addEventListener("click", () => {
  popupWithAvatar.openPopup();
});

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
buttonOpenPopupEditProfile.addEventListener("click", () => {
  popupEditProfile.openPopup();
  putUserInfo();
});

// ПОДСТАВЛЯТЬ В VALUE ФОРМЫ ЮЗЕРА АКТУАЛЬНЫЕ ДАННЫЕ
const putUserInfo = () => {
  userNameInput.value = userInfo.getUserInfo().userName;
  userStatusInput.value = userInfo.getUserInfo().userStatus;

  editProfileSaveButton.removeAttribute("disabled");
  editProfileSaveButton.classList.remove("form__save-button_disabled");
};

// ПОПАП С ДОБАВЛЕНИЕМ КАРТОЧКИ

const handlePopupAddCard = (object) => {
  addCardSaveButton.textContent = "Сохранение...";
  api
    .loadCard(object.cardname, object.cardlink)
    .then((res) => {
      const newCard = new Card(res, templateSelector, handleCardClick, handleRemoveCard, addLike, removeLike, true, false);
      cardList.setItem(newCard.generate())
      popupAddCardForm.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      console.log(object.link)
    })
    .finally(() => {
      addCardSaveButton.textContent = "Сохранить";
    });
};

const popupAddCardForm = new PopupWithForm("#popup-add-card", handlePopupAddCard);
popupAddCardForm.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", () => {
  popupAddCardForm.openPopup();
});