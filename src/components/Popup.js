class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector
        this._hasEventListeners = false //Чтоб прослушиватели событий добавлялись только один раз.
    }

    getPopup(){
        return document.querySelector(this._popupSelector)
    }

    openPopup(){
        if (!this._hasEventListeners) {this.setEventListeners()}
        this.getPopup().classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    closePopup(){
        this.getPopup().classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e){
        if (e.key === 'Escape') {
            this.closePopup()
        }
    }

    setEventListeners(){
        this._hasEventListeners = true
        this.getPopup().querySelector('.popup__button-close').addEventListener('click', e => this.closePopup());
        this.getPopup().querySelector('.popup__overlay').addEventListener('click', e => this.closePopup());
    }
}

export {Popup};