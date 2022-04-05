import { Popup } from './Popup.js'
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popup = document.querySelector(this._popupSelector)
        this._image = this._popup.querySelector('.popup__image')
        this._text = this._popup.querySelector('.popup__description')  
        this._hasEventListeners = false
    }

    openPopup({name, link}){
        this._image.setAttribute('src', link); 
        this._image.setAttribute('alt', name);
        this._text.textContent = name;
        super.openPopup()
    }
}

export {PopupWithImage}