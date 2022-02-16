export default class Card {
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner, isLiked) {
    this._id = data._id;
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._isOwner = isOwner;
    this._isLiked = isLiked;
    console.log(this._isLiked);
  }

  // Получаем разметку
  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  // Устанавливаем слушатели
  _setEventListeners(userId) {
    // Переменные
    const image = this._element.querySelector(".card__image");
    const trash = this._element.querySelector(".card__delete");
    const cardLike = this._element.querySelector(".card__like");

    // Слушатель для попапа изображения
    image.addEventListener("click", () => {
      this._handleCardClick(this._element);
    });

    // Слушатель для лайка
    cardLike.addEventListener("click", () => {
      cardLike.classList.contains("card__like_active") ? this._removeLike(this._element, this._id) : this._addLike(this._element, this._id);
    });

    // Слушатель для удаления
    trash.addEventListener("click", () => {
      this._handleRemoveCard(this._element);
    });
  }

  // Генерируем карточку
  generate() {
    // Переменные
    this._element = this._getTemplate();
    const title = this._element.querySelector(".card__name");
    const image = this._element.querySelector(".card__image");
    const likeCounter = this._element.querySelector(".card__like-count");
    const trash = this._element.querySelector(".card__delete");
    const cardLike = this._element.querySelector(".card__like");

    // Подставить данные в карточку
    title.textContent = this._title;
    image.src = this._image;
    image.alt = this._title;
    likeCounter.textContent = this._likes.length;

    // Проверить своя ли карточка и убрать корзину если нет
    if (!this._isOwner) {
      trash.classList.add("card__delete_disabled");
    }

    // Проверить поставлен ли лайк карточке
    if (this._isLiked) {
      cardLike.classList.add("card__like_active");
    }

    // Добавить слушатели
    this._setEventListeners();

    // Возвращаем карточку
    return this._element;
  }
}
