class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector
        this._hasEventListeners = false //Чтоб прослушиватели событий добавлялись только один раз.
    }

    _getPopup(){
        return document.querySelector(this._popupSelector)
    }

    openPopup(){
        if (!this._hasEventListeners) {this.setEventListeners()}
        this._getPopup().classList.add('popup_opened');
        window.addEventListener('keydown', e => this._handleEscClose(e));
    }

    closePopup(){
        this._getPopup().classList.remove('popup_opened');
        window.removeEventListener('keydown', e => this._handleEscClose(e));
    }

    _handleEscClose(e){
        if (e.key === 'Escape') {
            this.closePopup()
        }
    }

    setEventListeners(){
        this._hasEventListeners = true
        this._getPopup().querySelector('.popup__button-close').addEventListener('click', e => this.closePopup());
        this._getPopup().querySelector('.popup__overlay').addEventListener('click', e => this.closePopup());
        this._getPopup().querySelector('.popup__overlay').addEventListener('click', e => this.closePopup());
    }
}

export {Popup};