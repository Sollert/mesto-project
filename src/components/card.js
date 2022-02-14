export default class Card {
    constructor({data}, cardSelector) {
        this._title = data.name
        this._image = data.link
        this._likes = data.likes
        this._cardId = data.cardId
        this._cardAuthorId = data.cardAuthorId
        this._cardSelector = cardSelector
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
        const cardLike = cardElement.querySelector('.card__like')

        if (cardLike.classList.contains('.card__like_active')) {
            cardLike.classList.remove('card__like_active')
            cardLike.textContent = this._likes.length;
        } else {
            cardLike.classList.remove('card__like_active')
            cardLike.textContent = this._likes.length;
        }
    }

    _setEventListeners() {

    }

    generate(cardImage, cardName, likeCounter, trash, userId, likeButton) {

        this._element = this._getTemplate();

        this._setEventListeners()

        cardName.textContent = this._title
        cardImage.src = this._image
        cardImage.alt = this._title
        likeCounter.textContent = this._likes.length

        if (this._cardAuthorId !== userId) {
            trash.classList.add('card__delete_disabled')
        }

        this._likes.forEach((like) => {
            if (like._id === userId) {
                likeButton.classList.add('card__like_active')
            } else {
                likeButton.classList.remove('card__like_active')
            }
        })

        return this._element
    }
}