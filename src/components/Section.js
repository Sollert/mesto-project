export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Добавлять карточки в разметку
    setItem(element) {
        this._container.prepend(element);
    }

    // Обрабатывать карточки
    renderItems(data) {
        data.forEach((item) => {
            this._renderer(item);
        });
    }
}