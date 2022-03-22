class FormValidator {
    constructor(config, form) {
        this._config = config,
        this._form = form
    }

    enableValidation() {
        this._form.addEventListener('submit', evt => evt.preventDefault());
        const fieldsetList = Array.from(this._form.querySelectorAll(this._config.fieldsetList));
        fieldsetList.forEach((fieldSet) => {
          this._setEventListeners(fieldSet);
        }); 
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

    toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._config.inactiveButtonClass)
          buttonElement.setAttribute('disabled', 'disabled')
        } else {
          buttonElement.classList.remove(this._config.inactiveButtonClass)
          buttonElement.removeAttribute('disabled', 'disabled')
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