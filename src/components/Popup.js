class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector
        this._hasEventListeners = false //Чтоб прослушиватели событий добавлялись только один раз.
        this._popup = document.querySelector(this._popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    openPopup(){
        if (!this._hasEventListeners) {this.setEventListeners()}
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e){
        if (e.key === 'Escape') {
            this.closePopup()
        }
    }

    setEventListeners(){
        this._hasEventListeners = true
        this._popup.querySelector('.popup__button-close').addEventListener('click', e => this.closePopup());
        this._popup.querySelector('.popup__overlay').addEventListener('click', e => this.closePopup());
    }
}

export {Popup};