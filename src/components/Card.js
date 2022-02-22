export default class Card {
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, addLike, removeLike, isOwner, isLiked) {
    this.id = data._id;
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._isOwner = isOwner;
    this.isLiked = isLiked;
  }

  // Получаем разметку
  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  // Устанавливаем слушатели
  _setEventListeners() {
    // Слушатель для попапа изображения
    this.imageEl.addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });

    // Слушатель для лайка
    this.cardLikeEl.addEventListener("click", () => {
      this.isLiked ? this._removeLike(this) : this._addLike(this);
    });

    // Слушатель для удаления
    this.trashEl.addEventListener("click", () => {
      this._handleRemoveCard(this);
      this.trashEl.closest('.card').remove()
    });
  }

  // Генерируем карточку
  generate() {
    // Переменные
    this.element = this._getTemplate();
    this.titleEl = this.element.querySelector(".card__name");
    this.imageEl = this.element.querySelector(".card__image");
    this.likeCounterEl = this.element.querySelector(".card__like-count");
    this.trashEl = this.element.querySelector(".card__delete");
    this.cardLikeEl = this.element.querySelector(".card__like");

    // Подставить данные в карточку
    this.titleEl.textContent = this._title;
    this.imageEl.src = this._image;
    this.imageEl.alt = this._title;
    this.likeCounterEl.textContent = this._likes.length;

    // Проверить своя ли карточка и убрать корзину если нет
    if (!this._isOwner) {
      this.trashEl.classList.add("card__delete_disabled");
    }

    // Проверить поставлен ли лайк карточке
    if (this.isLiked) {
      this.cardLikeEl.classList.add("card__like_active");
    }

    // Добавить слушатели
    this._setEventListeners();

    // Возвращаем карточку
    return this.element;
  }
}
