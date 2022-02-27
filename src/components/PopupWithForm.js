import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__element");
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector(".form__save-button");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  loadingSaveButton = (isLoading) => {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  };
}
