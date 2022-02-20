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
    console.log(this._inputList);
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      console.log(input);
    });

    return this._formValues;
  }

  closePopup() {
    this._form.reset();
    this._button.classList.add("form__save-button_disabled");
    this._button.setAttribute("disabled", true);
    super.closePopup();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      console.log(this._getInputValues());
    });

    super.setEventListeners();
  }
}
