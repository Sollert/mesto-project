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
import { popupEditProfile, buttonOpenPopupEditProfile, formEditProfile, userNameInput, userStatusInput, userName, userStatus, editProfileSaveButton, cardsContainer, popupAddCard, buttonOpenPopupAddCard, addCardForm, userAvatar, avatarPopup, buttonOpenAvatarPopup, addCardSaveButton, editAvatarSaveButton, editAvatarForm, avatarLinkInput, popups, configApi, configValidation, templateSelector } from "./constants.js";

// ОБЪЯВИТЬ ЭКЗЕМПЛЯР АПИ ДЛЯ ВСЕГО
const api = new Api(configApi);

// СОБЫТИЯ ДЛЯ КАРТОЧКИ
// Открыть попап с изображением
const handleCardClick = () => {};

// Удалить карточку
const handleRemoveCard = () => {

};

// Лайк
const addLike = (card, cardId) => {
  const cardLike = card.querySelector(".card__like");
  const likeCounter = card.querySelector(".card__like-count");

  api.addLikeCard(cardId).then((data) => {
    cardLike.classList.add("card__like_active");
    likeCounter.textContent = data.likes.length;
  });
};

// Дизлайк
const removeLike = (card, cardId) => {
  const cardLike = card.querySelector(".card__like");
  const likeCounter = card.querySelector(".card__like-count");

  api.removeLikeCard(cardId).then((data) => {
    cardLike.classList.remove("card__like_active");
    likeCounter.textContent = data.likes.length;
  });
};

// ОБЪЯИТЬ ЭКЗЕМПЛЯР SECTION ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК В РАЗМЕТКУ
const cardList = new Section((data) => renderCard(data), ".cards");

// РЕНДЕР КАРТОЧЕК
const renderCard = (data) => {
  const isOwner = checkIsOwner(data)
  const card = new Card(data, templateSelector, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner);
  const cardElement = card.generate();
  cardList.setItem(cardElement);
};

// ПРОВЕРИТЬ ВЛАДЕЛЬЦА КАРТОЧКИ
const checkIsOwner = (card) => {
  return userInfo.getUserId() === card.owner._id
}

// ЭКЗЕМПЛЯР ЮЗЕРИНФО
const userInfo = new UserInfo('.user__name','.user__status', '.user__avatar')

// ОТОБРАЗИТЬ ДАННЫЕ С СЕРВЕРА НА СТРАНИЦУ
const loadAllInfo = () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cardsList]) => {
      userInfo.id = user._id
      userInfo.setUserInfo(user)
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

// ПОДСТАВЛЯТЬ В VALUE ФОРМЫ ЮЗЕРА АКТУАЛЬНЫЕ ДАННЫЕ
const putUserInfo = () => {
  userNameInput.value = userName.textContent;
  userStatusInput.value = userStatus.textContent;
};

// СЛУШАТЕЛИ
const setListeners = () => {
  // ДОБАВИТЬ КАРТОЧКУ
  addCardForm.addEventListener("submit", () => {
    addCardSaveButton.textContent = "Сохранение...";
    addCard();
  });

  // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  formEditProfile.addEventListener("submit", (evt) => {
    editProfileSaveButton.textContent = "Сохранение...";
    updateUserInfo(userNameInput.value, userStatusInput.value)
      .then((res) => {
        userName.textContent = userNameInput.value;
        userStatus.textContent = userStatusInput.value;
        closePopup(popupEditProfile);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfileSaveButton.textContent = "Сохранить";
      });
  });

  // СОХРАНЯТЬ ДАННЫЕ ИЗ ФОРМЫ ОБНОВИТЬ АВАТАР
  editAvatarForm.addEventListener("submit", (evt) => {
    editAvatarSaveButton.textContent = "Сохранение...";
    updateAvatar(avatarLinkInput.value)
      .then((res) => {
        userAvatar.src = res.avatar;
        editAvatarForm.reset();
        closePopup(avatarPopup);
        disableButton(editAvatarSaveButton, "form__save-button_disabled");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarSaveButton.textContent = "Сохранить";
      });
  });

  // ОТКРЫТЬ ПОПАП ПРОФИЛЯ
  buttonOpenPopupEditProfile.addEventListener("click", () => {
    openPopup(popupEditProfile);
    putUserInfo();
  });

  // ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
  buttonOpenAvatarPopup.addEventListener("click", () => openPopup(avatarPopup));

  // ОТКРЫТЬ ПОПАП ЗАГРУЗКИ КАРТОЧКИ
  buttonOpenPopupAddCard.addEventListener("click", () => openPopup(popupAddCard));

  // ЗАКРЫТЬ ПОПАПЫ
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__close-button")) {
        closePopup(popup);
      }
    });
  });
};
setListeners();

//Валидация
const enableVlidation = () => {
  const validation = new FormValidation({ obj: configValidation }, popups);

  popups.forEach((elem) => {
    validation.enableValidation(configValidation);
  });
};

enableVlidation();
