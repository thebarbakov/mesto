import { Popup } from './Popup.js'
class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector);
        this._submitCallback = submitCallback
        this._hasEventListeners = false
        this._popup = document.querySelector(this._popupSelector)
        this._inputList = this._popup.querySelectorAll('.popup__input')
        this._form =  this._popup.querySelector('.popup__form')
        this.submitButton =  this._popup.querySelector('.popup__button-save')
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
        return this._formValues;
    }

    closePopup(){
        super.closePopup()
        this._form.reset();
    }

    setSubmitAction(action){
        this._submitCallback = action
    }

    setEventListeners(){
        this._hasEventListeners = true
        super.setEventListeners()
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitCallback(this._getInputValues())
        }); 
    }

}

export {PopupWithForm};