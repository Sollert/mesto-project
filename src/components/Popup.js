class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(this._selector);
  }

  // ОТКРЫТЬ ПОПАП
  openPopup() {
    document.addEventListener("keydown", handleEscPopupClose);
    this._popup.classList.add("popup_opened");
    this._popup.classList.remove("popup-smooth-closing"); // Убираем класс, чтобы анимация плавности срабатывала только после открытия попапа
  }

  // ЗАКРЫТЬ ПОПАП
  closePopup() {
    this._popup.classList.remove("popup_opened");
    this._popup.classList.add("popup-smooth-closing"); // Добавляем класс, чтобы анимация плавности срабатывала только после открытия попапа
    document.removeEventListener("keydown", handleEscPopupClose);
  }

  // ЗАКРЫТЬ ПОПАП ИЗОБРАЖЕНИЯ
  _handleEscPopupClose(evt) {
    if (evt.key === "Escape" && this._popup.classList.contains("popup_opened")) {
      this.closePopup(openedPopup);
    }
  }

  // ЗАКРЫТЬ ПОПАПЫ
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
}
