// ИМПОРТ ИЗ MODAL.JS
import {
    closePopup,
    openCardPopup
} from './modal.js'
// ИМПОРТ ИЗ API.JS
import {
    addLikeCard,
    deleteCard,
    loadCard,
    removeLikeCard
} from './api.js'
// ИМПОРТ ИЗ INDEX.JS
import {
    userId
} from './index.js'
// ИМПОРТ ИЗ UTILS.JS
import {
    addCardForm,
    cardsContainer,
    popupAddCard,
    addCardSaveButton,
} from './utils.js'
// ИМПОРТ ИЗ VALIDATE.JS
import {
    disableButton
} from "./validate.js";


// СКРЫТЬ КОРЗИНУ НА ЧУЖИХ КАРТОЧКАХ
const hideTrash = (trash, cardAuthorId) => {
    if (cardAuthorId !== userId) {
        trash.classList.add('card__delete_disabled')
    }
}

// УДАЛИТЬ КАРТОЧКУ СО СТРАНИЦЫ
const removeCard = (trash, cardId) => {
    trash.addEventListener('click', () => {
        deleteCard(cardId)
            .then(() => {
                trash.closest('.card').remove()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    })
}

// ПРОВЕРИТЬ ЕСТЬ ЛИ НА КАРТОЧКЕ ЛАЙК
const isLiked = (likes, likeButton) => {
    likes.forEach((like) => {
        if(like._id === userId){
            likeButton.classList.add('card__like_active');
        } else {
            likeButton.classList.remove('card__like_active');
        }
    })
}

// ПОСТАВИТЬ КАРТОЧКЕ ЛАЙК
const likeCard = (likeButton, cardId, likeCounter) => {
    addLikeCard(cardId)
        .then((data) => {
            likeButton.classList.add('card__like_active')
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
}

// УБРАТЬ ЛАЙК С КАРТОЧКИ
const dislikeCard = (likeButton, cardId, likeCounter) => {
    removeLikeCard(cardId)
        .then((data) => {
            likeButton.classList.remove('card__like_active')
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
}

// ВЗАИМОДЕЙСТВИЕ С КНОПКОЙ ЛАЙКА
const likeEvent = (likeButton, cardId, likeCounter) => {
    likeButton.addEventListener('click', () => {
        if (!likeButton.classList.contains('card__like_active')) {
            likeCard(likeButton, cardId, likeCounter)
        } else {
            dislikeCard(likeButton, cardId, likeCounter)
        }
    })
}

// СОЗДАТЬ КАРТОЧКУ
const createCard = (name, link, likes, cardId, cardAuthorId) => {

    const cardTemplate = document.querySelector("#card-template").content; // Шаблон карточки
    const card = cardTemplate.querySelector('.card').cloneNode(true); // Карточка

    const cardImage = card.querySelector('.card__image') // Изображение
    const cardName = card.querySelector('.card__name') // Название

    const likeButton = card.querySelector('.card__like') // Кнопка лайка
    const likeCounter = card.querySelector('.card__like-count') // Количество лайков

    const trash = card.querySelector('.card__delete') // Корзина

    cardImage.src = link; // Подставить в атрибут src ссылку
    cardImage.alt = name; // Подставить в атрибут alt название
    cardName.textContent = name; // Подставить название
    likeCounter.textContent = likes.length // Подставить количество лайков

    cardImage.addEventListener('click', openCardPopup) // Открыть попап карточки по клику на изображение

    removeCard(trash, cardId)
    hideTrash(trash, cardAuthorId)
    isLiked(likes, likeButton)
    likeEvent(likeButton, cardId, likeCounter)

    return card // Вернуть готовую карточку
}

// ОТОБРАЗИТЬ КАРТОЧКУ В КОНТЕЙНЕРЕ
const renderCard = (container, element) => {
    container.prepend(element) // Добавить карточку в контейнер
}

// ДОБАВИТЬ КАРТОЧКУ В КОНТЕЙНЕР
const addCard = () => {
    loadCard()
        .then((res) => {
            renderCard(cardsContainer, createCard(res.name, res.link, res.likes, res._id, res.owner._id))
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            addCardSaveButton.textContent = 'Создать'
        })
    closePopup(popupAddCard)
    addCardForm.reset()
    disableButton(addCardSaveButton, 'form__save-button_disabled')
}


// ЭКСПОРТ
export {
    likeCard,
    removeCard,
    createCard,
    renderCard,
    addCard
}