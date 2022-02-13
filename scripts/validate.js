const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    function removeClass(errorElement) {
      errorElement.classList.remove(config.animationOpenClass);
  }
    errorElement.classList.add(config.animationOpenClass);
    errorElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    runWithDelay(removeClass, errorElement)
  };
  
  const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    function hideAfterDelayError(errorElement) {
      errorElement.classList.remove(config.inputErrorClass);
      errorElement.classList.remove(config.animationCloseClass);
      errorElement.textContent = '';
  }
    errorElement.classList.add(config.animationCloseClass);
    setTimeout(hideAfterDelayError, 500, errorElement);
  };
  
  const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
  };
  
  const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetList));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(config, fieldSet);
    }); 
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass)
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass)
    }
  }
  
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldsetList: '.popup__set',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input-error_active',
    animationOpenClass: 'animation__open',
    animationCloseClass: 'animation__close'
  }); 
  