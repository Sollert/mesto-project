export default class FormValidation {
  constructor({ settings }, formElement) {
    this._formElement = formElement;
    this._configValidation = settings;
    this._buttonElement = this._formElement.querySelector(this._configValidation.buttonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._configValidation.inputSelector));
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
  _disableButton() {
    this._buttonElement.classList.add(this._configValidation.buttonDisabledClass);
    this._buttonElement.disabled = true;
  }

  // СДЕЛАТЬ КНОПКУ АКТИВНОЙ
  _enableButton() {
    this._buttonElement.classList.remove(this._configValidation.buttonDisabledClass);
    this._buttonElement.disabled = false;
  }

  // МЕНЯТЬ АКТИВНОСТЬ КНОПКИ
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // ДОБАВИТЬ СЛУШАТЕЛИ
  _setEventListeners() {
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
  
  resetValidation() {
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
      this._hideInputError(inputElement, errorElement);
    });
    
  }
}

