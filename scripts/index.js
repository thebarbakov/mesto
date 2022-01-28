//Root
let container = document.querySelector('.root');
//Cards
const elementsInitial = [
    {
    name: 'Куршская коса',
    link: './images/photos/kosa.jpg'},
    {
    name: 'Карелия',
    link: './images/photos/karelia.jpg'},
    {
     name: 'Сочи',
    link: './images/photos/sochi.jpg'},
    {
    name: 'Камчатка',
    link: './images/photos/kamchatka.jpg'},
    {
    name: 'Урал',
    link: './images/photos/ural.jpg'}, 
    {
    name: 'Домбай',
    link: './images/photos/dombay.jpg'}]
let cardsContainer = container.querySelector('.elements');
let popupNewCard = container.querySelector('#popup-new-card');
let formNewCard = popupNewCard.querySelector(".popup__form");
const buttonAddCard = container.querySelector('.profile__button-add');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');
let inputNewCardName = popupNewCard.querySelector("#card-name-input");
let inputNewCardLink = popupNewCard.querySelector("#card-link-input");

//Profile
let popupProfile = container.querySelector('#popup-profile');
let formProfile = popupProfile.querySelector(".popup__form");
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const buttonOpenPopupProfile = container.querySelector('.profile__button-edit');
let blockName = container.querySelector('.profile__name');
let blockJob = container.querySelector('.profile__job');
let inputProfileName = popupProfile.querySelector("#profile-name-input");
let inputProfileJob = popupProfile.querySelector("#profile-job-input");


function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    popupProfile.classList.add('animation__open');
    inputProfileName.setAttribute('value', blockName.textContent); 
    inputProfileJob.setAttribute('value', blockJob.textContent);
    window.scrollTo(scrollX, 0);
    window.addEventListener('scroll', scrollToTop);
} 
//Scroll blocking when popup opened
let scrollToTop = () => window.scrollTo(scrollX, 0);

function openPopupNewCard() {
    popupNewCard.classList.add('popup_opened');
    popupNewCard.classList.add('animation__open');
    window.scrollTo(scrollX, 0);
    window.addEventListener('scroll', scrollToTop);
} 

function closePopup(event) {
    function removeClasses(formOfButton) {
        formOfButton.classList.remove('popup_opened');
        formOfButton.classList.remove('animation__close');
    }
    let formOfButton = event.parentElement.parentElement;
    formOfButton.classList.remove('animation__open');
    formOfButton.classList.add('animation__close');
    window.removeEventListener('scroll', scrollToTop);
    setTimeout(removeClasses, 500, formOfButton);
}
//Save popupProfile
function formProfileSubmitButton(evt) {
    evt.preventDefault();
    blockName.innerText = inputProfileName.value;
    blockJob.innerText = inputProfileJob.value;
    closePopup(this);
}
//Save new card
function addCard(name, link) {
    const cardTemplate = document.querySelector('#card').content; 
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__title').textContent = name;
    newCard.querySelector('.element__image').setAttribute('src', link);
    newCard.querySelector('.element__image').setAttribute('alt', name);
    newCard.querySelector('.element__image').addEventListener('click', function(event){
        const popupElement = document.querySelector('#popup-element').content;
        const newPopupElement = popupElement.querySelector('.popup').cloneNode(true);
        newPopupElement.querySelector('.popup__image').setAttribute('src', link);
        newPopupElement.querySelector('.popup__image').setAttribute('alt', name);
        newPopupElement.querySelector('.popup__description').textContent = name;
        newPopupElement.querySelector('.popup__button-close').addEventListener('click', function(event){
            let element = event.target.closest('.popup');
            element.classList.add('animation__close');
            window.removeEventListener('scroll', scrollToTop);
            setTimeout(() => element.remove(), 400);});
        newPopupElement.classList.add('animation__open');
        document.querySelector('.footer').after(newPopupElement);
        window.scrollTo(scrollX, 0);
        window.addEventListener('scroll', scrollToTop);
    });
    newCard.querySelector('.element__like').addEventListener('click', function(event){
        event.target.classList.toggle('element__like_active');
    });
    newCard.querySelector('.element__delete').addEventListener('click', function(event){
        let element = event.target.closest('.element');
        element.classList.add('animation__close');
        setTimeout(() => element.remove(), 400);
    });
    cardsContainer.prepend(newCard);
    cardsContainer.classList.add('animation__open');
    setTimeout(() => cardsContainer.classList.remove('animation__open'), 400);
}

function addCardForm(evt) {
    evt.preventDefault();
    addCard (inputNewCardName.value, inputNewCardLink.value);
    closePopup(this);
    inputNewCardName.value = '';
    inputNewCardLink.value = '';
};
//Add initial card
elementsInitial.forEach(el => addCard(el.name, el.link));

//Profile Buttons
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', function(event){closePopup(event.target)});
formProfile.addEventListener('submit', formProfileSubmitButton); 

//New Card Buttons 
buttonAddCard.addEventListener('click', openPopupNewCard);
buttonClosePopupNewCard.addEventListener('click', function(event){closePopup(event.target)});
formNewCard.addEventListener('submit', addCardForm); 




