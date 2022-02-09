const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    function removeClass(errorElement) {
      errorElement.classList.remove('animation__open');
  }
    errorElement.classList.add('animation__open');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
    setTimeout(removeClass, 500, errorElement);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    function hideAfterDelayError(errorElement) {
      errorElement.classList.remove('popup__input-error_active');
      errorElement.classList.remove('animation__close');
      errorElement.textContent = '';
  }
    errorElement.classList.add('animation__close');
    setTimeout(hideAfterDelayError, 500, errorElement);
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    }); 
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_disabled')
    } else {
      buttonElement.classList.remove('popup__button-save_disabled')
    }
  }
  enableValidation();
  