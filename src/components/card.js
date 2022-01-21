import {closePopup, openCardPopup} from './modal.js'
import {
    cards,
    popupAddCard,
    addCardForm,
    cardNameInput,
    cardLinkInput
} from './data.js'

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

    card.querySelector('.card__image').alt = name;
    card.querySelector('.card__name').textContent = name;
    card.querySelector('.card__image').src = link;

    card.querySelector('.card__image').addEventListener('click', openCardPopup)
    card.querySelector('.card__like').addEventListener('click', likeCard)
    card.querySelector('.card__delete').addEventListener('click', deleteCard)

    return card
}

// Добавление карточки в контейнер
function renderCard(container, element){
    container.prepend(element)
}

// Добавить карточку в список карточек
function addCard(evt){
    evt.preventDefault()
    renderCard(cards, createCard(cardNameInput.value, cardLinkInput.value) );

    closePopup(popupAddCard)
    addCardForm.reset()
}

export { likeCard, deleteCard, createCard, renderCard, addCard }