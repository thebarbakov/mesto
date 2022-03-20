import { Popup } from './Popup.js'
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._hasEventListeners = false
    }

    openPopup({name, link}){
        const image = super.getPopup().querySelector('.popup__image')
        image.setAttribute('src', link); 
        image.setAttribute('alt', name);
        super.getPopup().querySelector('.popup__description').textContent = name;
        super.openPopup()
    }
}

export {PopupWithImage}