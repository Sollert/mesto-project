import {closePopup, openCardPopup} from './modal.js'
import {
    cards,
    popupAddCard,
    addCardForm,
    cardNameInput,
    cardLinkInput
} from './utils.js'

// Поставить лайк карточке
function likeCard(evt){
    evt.target.classList.toggle('card__like_active')
}

// Удалить карточку
function deleteCard(evt){
    evt.target.closest('.card').remove()
}

// Создать карточку
function createCard(name, link){
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image')

    cardImage.alt = name;
    card.querySelector('.card__name').textContent = name;
    cardImage.src = link;

    cardImage.addEventListener('click', openCardPopup)
    card.querySelector('.card__like').addEventListener('click', likeCard)
    card.querySelector('.card__delete').addEventListener('click', deleteCard)

    return card
}

// Добавление карточки в контейнер
function renderCard(container, element){
    container.prepend(element)
}

export { likeCard, deleteCard, createCard, renderCard }