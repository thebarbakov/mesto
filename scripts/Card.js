import { popupElement, popupElementImage, popupElementDescription, openPopup } from './index.js'

class Card{
    constructor(data, cardSelector){
        this.name = data.name;
        this.link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true)

        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate()
        this._element.querySelector('.element__title').textContent = this.name;
        this._element.querySelector('.element__image').setAttribute('src', this.link);
        this._element.querySelector('.element__image').setAttribute('alt', this.name);
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click',(e => e.target.classList.toggle('element__like_active')));

        this._element.querySelector('.element__delete').addEventListener('click', function(e){
        e.target.closest('.element').remove();
        });

        this._element.querySelector('.element__image').addEventListener('click', (e) => this._handleOpenPopup());
    }

    _handleOpenPopup() {
        popupElementImage.setAttribute('src', this.link); 
        popupElementImage.setAttribute('alt', this.name);
        popupElementDescription.textContent = this.name;
        openPopup(popupElement);
    }

}

export {Card};