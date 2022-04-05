class FormValidator {
    constructor(config, form) {
      this._config = config,
      this._form = form
      this._fieldsetList = this._form.querySelector(this._config.fieldsetList)
      this.buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    }

    enableValidation() {
      this._form.addEventListener('submit', evt => evt.preventDefault());
      this._setEventListeners(this._fieldsetList);
    };

    _setEventListeners(formElement) {
      const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
      const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
      this.toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
          this._checkInputValidity(formElement, inputElement);
          this.toggleButtonState(inputList, buttonElement);
        });
      });
    };

    disableSubmitButton() {
      this.buttonElement.classList.add(this._config.inactiveButtonClass)
      this.buttonElement.setAttribute('disabled', 'disabled')
    }
  
    enableSubmitButton() {
      this.buttonElement.classList.remove(this._config.inactiveButtonClass)
      this.buttonElement.removeAttribute('disabled', 'disabled')
    }
  
  
    toggleButtonState(inputList) {
      if (this._hasInvalidInput(inputList)) {
        this.disableSubmitButton();
      } else {
        this.enableSubmitButton()
      }
    } 
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      }); 
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(formElement, inputElement);
        }
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.inputErrorClass);
        inputElement.classList.add(this._config.inputWindowErrorClass)
        errorElement.textContent = errorMessage;
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputWindowErrorClass)
        errorElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    };

}

export { FormValidator };