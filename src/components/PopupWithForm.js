import { Popup } from './Popup.js'
class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector);
        this._submitCallback = submitCallback
        this._hasEventListeners = false
    }

    _getInputValues(){
        this._inputList = super._getPopup().querySelectorAll('.popup__input')
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
        return this._formValues;
    }

    closePopup(){
        this._getPopup().classList.remove('popup_opened');
        window.removeEventListener('keydown', e => this._handleEscClose());
        this._getPopup().querySelector('.popup__form').reset();
    }

    setEventListeners(){
        this._hasEventListeners = true
        this._getPopup().querySelector('.popup__button-close').addEventListener('click', e => this.closePopup());
        this._getPopup().querySelector('.popup__overlay').addEventListener('click', e => this.closePopup());
        this._getPopup().querySelector('.popup__form').addEventListener('submit', e => this._submitCallback(e));
    }

}

export {PopupWithForm};