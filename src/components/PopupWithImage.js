import { Popup } from './Popup.js'
class PopupWithImage extends Popup {
    constructor(popupSelector, {name, link}){
        super(popupSelector);
        this._name = name
        this._link = link
        this._hasEventListeners = false
    }

    openPopup(){
        if (!this._hasEventListeners) {super.setEventListeners()}
        super._getPopup().querySelector('.popup__image').setAttribute('src', this._link); 
        super._getPopup().querySelector('.popup__image').setAttribute('alt', this._name);
        super._getPopup().querySelector('.popup__description').textContent = this._name;
        super._getPopup().classList.add('popup_opened');
        window.addEventListener('keydown', e => this._handleEscClose(e));
    }
}

export {PopupWithImage}