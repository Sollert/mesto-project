// ИМПОРТ INDEX.CSS
import "./index.css";
// ИМПОРТЫ КЛАССОВ
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidation from "../components/FormValidation.js";
// ИМПОРТ CONSTANTS.JS
import {
  editProfileSaveButton,
  userNameInput,
  userStatusInput,
  userName,
  userStatus,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddCard,
  userAvatar,
  buttonOpenAvatarPopup,
  addCardSaveButton,
  editAvatarSaveButton,
  popups,
  configApi,
  configValidation,
  cardTemplate,
  formEditProfile, editAvatarForm, addCardForm
} from "../utils/constants.js";

// ОБЪЯВИТЬ ЭКЗЕМПЛЯР АПИ ДЛЯ ВСЕГО
const api = new Api(configApi);

// СОБЫТИЯ ДЛЯ КАРТОЧКИ
// Открыть попап с изображением
const handleCardClick = (link, description) => {
  popupWithImg.openPopup(link, description);
};

// Удалить карточку
const handleRemoveCard = (card) => {
  api
    .deleteCard(card.id)
    .then(() => {
      card.trashEl.closest(".card").remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const addLike = (card) => {
  api.addLikeCard(card.id).then((data) => {
    card.toggleLike(data);
  });
};

// Дизлайк
const removeLike = (card) => {
  api.removeLikeCard(card.id).then((data) => {
    card.toggleLike(data);
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
  const card = new Card(data, cardTemplate, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner, isLiked);
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

//Валидация редактирвоания профиля
const editProfileValidation = new FormValidation({ settings: configValidation }, formEditProfile);
editProfileValidation.enableValidation()

// Валидация редактирования автара
const editAvatarValidation = new FormValidation({ settings: configValidation }, editAvatarForm);
editAvatarValidation.enableValidation()

// Валидация добавление карточки
const addCardValidation = new FormValidation({ settings: configValidation }, addCardForm);
addCardValidation.enableValidation()

//Popup With Image
const popupWithImg = new PopupWithImage("#card-popup", ".popup__image", ".popup__description");
popupWithImg.setEventListeners();

//Popup with avatar

const handlePopupWithAvatar = (object) => {
  popupWithAvatar.loadingSaveButton(true);
  api
    .updateAvatar(object.avatarLink)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatar.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithAvatar.loadingSaveButton(false);
    });
};

const popupWithAvatar = new PopupWithForm("#avatar-popup", handlePopupWithAvatar);
popupWithAvatar.setEventListeners();

//Popup Edit Profile
const handlePopupWithProfile = (object) => {
  popupEditProfile.loadingSaveButton(true);
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
      popupEditProfile.loadingSaveButton(false);
    });
};
const popupEditProfile = new PopupWithForm("#popup-edit-profile", handlePopupWithProfile);
popupEditProfile.setEventListeners();

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
buttonOpenAvatarPopup.addEventListener("click", () => {
  popupWithAvatar.openPopup();
  editAvatarValidation.resetValidation()
});

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
buttonOpenPopupEditProfile.addEventListener("click", () => {
  popupEditProfile.openPopup();
  putUserInfo();
  editProfileValidation.resetValidation();
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
  popupAddCardForm.loadingSaveButton(true);
  api
    .loadCard(object.cardname, object.cardlink)
    .then((res) => {
      const newCard = new Card(res, cardTemplate, handleCardClick, handleRemoveCard, addLike, removeLike, true, false);
      cardList.setItem(newCard.generate());
      popupAddCardForm.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      console.log(object.link);
    })
    .finally(() => {
      popupAddCardForm.loadingSaveButton(false);
    });
};

const popupAddCardForm = new PopupWithForm("#popup-add-card", handlePopupAddCard);
popupAddCardForm.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", () => {
  popupAddCardForm.openPopup();
  addCardValidation.resetValidation();
});
