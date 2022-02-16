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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement, buttonDisabledClass) {
    buttonElement.classList.add(buttonDisabledClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement, buttonDisabledClass) {
    buttonElement.classList.remove(buttonDisabledClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass) {
    const buttonElement = formElement.querySelector(buttonSelector);

    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, buttonDisabledClass);
    } else {
      enableButton(buttonElement, buttonDisabledClass);
    }
  }

  _setEventListeners(formElement, { inputSelector, inputInvalidClass, errorClass, buttonSelector, buttonDisabledClass }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, inputInvalidClass, errorClass);
        toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
      });
    });

    toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
  }

  enableValidation({ formSelector, ...rest }) {
    Array.from(document.querySelectorAll(formSelector)).forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });

      setEventListeners(formElement, rest);
    });
  }
}

// ПОКАЗАТЬ ОШИБКИ
const showInputError = (inputElement, inputInvalidClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputInvalidClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

// СКРЫТЬ ОШИБКИ
const hideInputError = (inputElement, inputInvalidClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputInvalidClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// ВАЛИДАЦИЯ
const checkInputValidity = (formElement, inputElement, inputInvalidClass, errorClass) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputInvalidClass, errorElement, errorClass);
  } else {
    showInputError(inputElement, inputInvalidClass, errorElement, errorClass, inputElement.validationMessage);
  }
};

// ПРОВЕРИТЬ ЕСТЬ ЛИ НЕПРАВИЛЬНО ЗАПОЛНЕННЫЕ ИНПУТЫ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// СДЕЛАТЬ КНОПКУ НЕАКТИВНОЙ
const disableButton = (buttonElement, buttonDisabledClass) => {
  buttonElement.classList.add(buttonDisabledClass);
  buttonElement.disabled = true;
};

// СДЕЛАТЬ КНОПКУ АКТИВНОЙ
const enableButton = (buttonElement, buttonDisabledClass) => {
  buttonElement.classList.remove(buttonDisabledClass);
  buttonElement.disabled = false;
};

// МЕНЯТЬ АКТИВНОСТЬ КНОПКИ
const toggleButtonState = (formElement, inputList, buttonSelector, buttonDisabledClass) => {
  const buttonElement = formElement.querySelector(buttonSelector);

  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, buttonDisabledClass);
  } else {
    enableButton(buttonElement, buttonDisabledClass);
  }
};

// ДОБАВИТЬ СЛУШАТЕЛИ
const setEventListeners = (formElement, { inputSelector, inputInvalidClass, errorClass, buttonSelector, buttonDisabledClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, inputInvalidClass, errorClass);
      toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
    });
  });

  toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
};

// РАЗРЕШИТЬ ВАЛИДАЦИЮ
const enableValidation = ({ formSelector, ...rest }) => {
  Array.from(document.querySelectorAll(formSelector)).forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, rest);
  });
};

export { showInputError, hideInputError, checkInputValidity, hasInvalidInput, disableButton, enableButton, setEventListeners, enableValidation };
