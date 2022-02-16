export default class FormValidation {
  constructor({ obj }, formElement) {
    this._formElement = formElement;
    this._configValidation = obj;
  }

  // ПОКАЗАТЬ ОШИБКИ
  _showInputError(inputElement, errorElement, errorMessage, settings) {
    inputElement.classList.add(settings.inputInvalidClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
  }

  // СКРЫТЬ ОШИБКИ
  _hideInputError(inputElement, errorElement, settings) {
    inputElement.classList.remove(settings.inputInvalidClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }

  // ВАЛИДАЦИЯ
  _checkInputValidity(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement, settings);
    } else {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage, settings);
    }
  }

  // ПРОВЕРИТЬ ЕСТЬ ЛИ НЕПРАВИЛЬНО ЗАПОЛНЕННЫЕ ИНПУТЫ
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // СДЕЛАТЬ КНОПКУ НЕАКТИВНОЙ
  _disableButton(buttonElement, buttonDisabledClass) {
    buttonElement.classList.add(buttonDisabledClass);
    buttonElement.disabled = true;
  }

  // СДЕЛАТЬ КНОПКУ АКТИВНОЙ
  _enableButton(buttonElement, buttonDisabledClass) {
    buttonElement.classList.remove(buttonDisabledClass);
    buttonElement.disabled = false;
  }

  // МЕНЯТЬ АКТИВНОСТЬ КНОПКИ
  _toggleButtonState(formElement, inputList, settings) {
    const buttonElement = formElement.querySelector(settings.buttonSelector);

    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, settings.buttonDisabledClass);
    } else {
      this._enableButton(buttonElement, settings.buttonDisabledClass);
    }
  }

  // ДОБАВИТЬ СЛУШАТЕЛИ
  _setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(formElement, inputList, settings);
      });
    });

    this._toggleButtonState(formElement, inputList, settings);
  }

  // РАЗРЕШИТЬ ВАЛИДАЦИЮ
  enableValidation(settings) {
    Array.from(document.querySelectorAll(settings.formSelector)).forEach((formElement) => {
      this._setEventListeners(formElement, settings);

      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
    });
  }
}
