export default class FormValidation {
  constructor({ obj }, formElement) {
    this._formElement = formElement;
    this._configValidation = obj;
  }

  // ПОКАЗАТЬ ОШИБКИ
  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._configValidation.inputInvalidClass);
    errorElement.classList.add(this._configValidation.errorClass);
    errorElement.textContent = errorMessage;
  }

  // СКРЫТЬ ОШИБКИ
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._configValidation.inputInvalidClass);
    errorElement.classList.remove(this._configValidation.errorClass);
    errorElement.textContent = "";
  }

  // ВАЛИДАЦИЯ
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement, this._configValidation);
    } else {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage, this._configValidation);
    }
  }

  // ПРОВЕРИТЬ ЕСТЬ ЛИ НЕПРАВИЛЬНО ЗАПОЛНЕННЫЕ ИНПУТЫ
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // СДЕЛАТЬ КНОПКУ НЕАКТИВНОЙ
  _disableButton(buttonDisabledClass) {
    this._buttonElement.classList.add(buttonDisabledClass);
    this._buttonElement.disabled = true;
  }

  // СДЕЛАТЬ КНОПКУ АКТИВНОЙ
  _enableButton(buttonDisabledClass) {
    this._buttonElement.classList.remove(buttonDisabledClass);
    this._buttonElement.disabled = false;
  }

  // МЕНЯТЬ АКТИВНОСТЬ КНОПКИ
  _toggleButtonState() {
    this._buttonElement = this._formElement.querySelector(this._configValidation.buttonSelector);

    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._configValidation.buttonDisabledClass);
    } else {
      this._enableButton(this._configValidation.buttonDisabledClass);
    }
  }

  // ДОБАВИТЬ СЛУШАТЕЛИ
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._configValidation.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  // РАЗРЕШИТЬ ВАЛИДАЦИЮ
  enableValidation() {
      this._setEventListeners(this._formElement, this._configValidation);
  }
}
