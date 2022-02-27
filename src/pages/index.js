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
import { editProfileSaveButton, userNameInput, userStatusInput, userName, userStatus, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, userAvatar, buttonOpenAvatarPopup, addCardSaveButton, editAvatarSaveButton, popups, configApi, configValidation, cardTemplate, formEditProfile, editAvatarForm, addCardForm } from "../utils/constants.js";

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
  api
    .addLikeCard(card.id)
    .then((data) => {
      card.toggleLike(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

// Дизлайк
const removeLike = (card) => {
  api
    .removeLikeCard(card.id)
    .then((data) => {
      card.toggleLike(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

// ЭКЗЕМПЛЯР ЮЗЕРИНФО
const userInfo = new UserInfo(".user__name", ".user__status", ".user__avatar");

// ОБЪЯИТЬ ЭКЗЕМПЛЯР SECTION ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК В РАЗМЕТКУ
const cardList = new Section((data) => renderCard(data), ".cards");

// РЕНДЕР КАРТОЧЕК
const renderCard = (card) => {
  const newCard = createCard(card);
  cardList.setItem(newCard.generate());
};

// Функция создания карточки
const createCard = (item) => {
  const isOwner = checkIsOwner(item);
  const isLiked = checkIsLiked(item.likes);
  const card = new Card(item, cardTemplate, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner, isLiked);
  return card;
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
      cardList.renderItems(cardsList);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};
loadAllInfo();

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidation({ settings: config }, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configValidation);

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
      // userName.textContent = res.name;
      // userStatus.textContent = res.about;
      userInfo.setUserInfo(res);
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
  formValidators["add-avatar"].resetValidation();
});

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
buttonOpenPopupEditProfile.addEventListener("click", () => {
  popupEditProfile.openPopup();
  putUserInfo();
  formValidators["edit-profile"].resetValidation();
});

// ПОДСТАВЛЯТЬ В VALUE ФОРМЫ ЮЗЕРА АКТУАЛЬНЫЕ ДАННЫЕ
const putUserInfo = () => {
  const info = userInfo.getUserInfo();
  userNameInput.value = info.userName;
  userStatusInput.value = info.userStatus;
};

// ПОПАП С ДОБАВЛЕНИЕМ КАРТОЧКИ

const handlePopupAddCard = (object) => {
  popupAddCardForm.loadingSaveButton(true);
  api
    .loadCard(object.cardname, object.cardlink)
    .then((res) => {
      const newCard = createCard(res);
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
  formValidators["add-card"].resetValidation();
});
