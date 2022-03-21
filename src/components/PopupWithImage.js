import { Popup } from './Popup.js'
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = super.getPopup().querySelector('.popup__image')
        this._text = super.getPopup().querySelector('.popup__description')  
        this._hasEventListeners = false
    }

    openPopup({name, link}){
        const image = super.getPopup().querySelector('.popup__image')
        this._image.setAttribute('src', link); 
        this._image.setAttribute('alt', name);
        this._text.textContent = name;
        super.openPopup()
    }
}

export {PopupWithImage}