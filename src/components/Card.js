export default class Card {
    constructor({data}, cardSelector, handleCardClick, handleRemoveCard) {
        this._title = data.name
        this._image = data.link
        this._likes = data.likes
        this._cardAuthorId = data.cardAuthorId
        this._cardSelector = document.querySelector(cardSelector)
        this._handleCardClick = handleCardClick
        this._handleRemoveCard = handleRemoveCard
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)

        return cardElement
    }

    _toggleLike() {
        const cardLike = this._element.querySelector('.card__like')

        if (cardLike.classList.contains('.card__like_active')) {
            cardLike.classList.remove('card__like_active')
            cardLike.textContent = this._likes.length;
        } else {
            cardLike.classList.remove('card__like_active')
            cardLike.textContent = this._likes.length;
        }
    }

    _setEventListeners(cardImage, likeButton, trash) {
        // СЛУШАТЕЛЬ ДЛЯ ПОПАПА КАРТИНКИ
        cardImage.addEventListener('click', () => {
            this._handleCardClick(cardImage)
        })

        // СЛУШАТЕЛЬ ЛАЙКА И ДИЗЛАЙКА
        likeButton.addEventListener('click', () => {
            this._toggleLike()
        })

        // СЛУШАТЕЛЬ УДАЛЕНИЯ КАРТОЧКИ
        trash.addEventListener('click', () => {
            this._handleRemoveCard()
        })

    }

    generate(userId) {

        this._element = this._getTemplate();

        this._setEventListeners()

        this._element.querySelector('.card__name').textContent = this._title
        this._element.querySelector('.card__image').src = this._image
        this._element.querySelector('.card__image').alt = this._title
        this._element.querySelector('.card__like-count').textContent = this._likes.length

        if (this._cardAuthorId !== userId) {
            this._element.querySelector('.card__delete').classList.add('card__delete_disabled')
        }

        this._likes.forEach((like) => {
            if (like._id === userId) {
                this._element.querySelector('.card__like').classList.add('card__like_active')
            } else {
                this._element.querySelector('.card__like').classList.remove('card__like_active')
            }
        })

        return this._element
    }
}