class Card{
    constructor(data, cardSelector, handleCardClick, userId, handeCardDelete, handeCardLike){
        this.name = data.name;
        this.link = data.link;
        this._ownerId = data.owner._id;
        this._cardId = data._id
        this._userId = userId
        this._likes = data.likes
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handeCardDelete;
        this._handleCardLike = handeCardLike;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true)
        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate()
        this._element.querySelector('.element__title').textContent = this.name;
        const image = this._element.querySelector('.element__image')
        image.setAttribute('src', this.link);
        image.setAttribute('alt', this.name);
        this._element.querySelector('.like__counter').textContent = this._likes.length;
        if(this._likes.find( el =>  el._id == this._userId)) {
            this._element.querySelector('.like__button').classList.add('like__button_active')
        }
        this._setEventListeners()
        return this._element;
    }

    _setEventListeners() {
        this._handleCardLike(this._element, this._cardId, this._likes)

        if(this._userId === this._ownerId) {
            this._element.querySelector('.element__delete').addEventListener('click', (e) => {
                this._handleCardDelete(this._cardId, this._element)
            }); 
        } else {
            this._element.querySelector('.element__delete').remove()
        }

        this._element.querySelector('.element__image').addEventListener('click', (e) =>this._handleCardClick({
            name: this.name,
            link: this.link
        }));
    }

}

export {Card};