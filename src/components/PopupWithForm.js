import { Popup } from './Popup.js'
class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector);
        this._submitCallback = submitCallback
        this._hasEventListeners = false
        this._inputList = super.getPopup().querySelectorAll('.popup__input')
        this._form =  this.getPopup().querySelector('.popup__form')
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
        window.removeEventListener('keydown', e => this._handleEscClose());
        this._form.reset();
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