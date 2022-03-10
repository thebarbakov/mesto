import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
//Root
const container = document.querySelector('.root');
const popupOverlay = document.querySelectorAll('.popup__overlay');
popupOverlay.forEach((element)=>{
    const popup = element.closest('.popup')
    console.log(popup)
    element.addEventListener('click', (event => closePopup(popup)));
})

const formsArray = document.querySelectorAll('.popup__form')
formsArray.forEach( form =>{
    const formValidator = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        fieldsetList: '.popup__set',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_disabled',
        inputErrorClass: 'popup__input-error_active',
        inputWindowErrorClass: 'popup__input_error',
        animationOpenClass: 'animation__open',
        animationCloseClass: 'animation__close'
    }, form)

    formValidator.enableValidation();
})

//Cards
const elementsInitial = [
    {
    name: 'Куршская коса',
    link: './images/photos/kosa.jpg'},
    {
    name: 'Карелия',
    link: './images/photos/karelia.jpg'},
    {
     name: 'Адлер',
    link: './images/photos/sochi.jpg'},
    {
    name: 'Камчатка',
    link: './images/photos/kamchatka.jpg'},
    {
    name: 'Урал',
    link: './images/photos/ural.jpg'}, 
    {
    name: 'Домбай',
    link: './images/photos/dombay.jpg'}];
const cardTemplate = document.querySelector('#card').content;
const popupNewCard = container.querySelector('.popup_new-card');
const buttonAddCard = container.querySelector('.profile__button-add');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');
const formNewCard = popupNewCard.querySelector('.popup__form');
const cardsContainer = container.querySelector('.elements');
const inputNewCardName = popupNewCard.querySelector("#card-name-input");
const inputNewCardLink = popupNewCard.querySelector("#card-link-input");
const popupCardButtonSave = popupNewCard.querySelector(".popup__button-save");

//Element Popup
const popupElement = container.querySelector('.popup_element');
const popupElementButton = popupElement.querySelector('.popup__button-close')
const popupElementImage = popupElement.querySelector('.popup__image')
const popupElementDescription = popupElement.querySelector('.popup__description');

//Profile
const popupProfile = container.querySelector('.popup_profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const buttonOpenPopupProfile = container.querySelector('.profile__button-edit');
const formProfile = popupProfile.querySelector('.popup__form');
const blockName = container.querySelector('.profile__name');
const blockJob = container.querySelector('.profile__job');
const inputProfileName = popupProfile.querySelector("#profile-name-input");
const inputProfileJob = popupProfile.querySelector("#profile-job-input");
const popupProfileButtonSave = popupProfile.querySelector(".popup__button-save");

export { popupElement, popupElementImage, popupElementDescription, openPopup };

//Popup Global
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupActive = container.querySelector('.popup_opened');
       closePopup(popupActive);
     }
} 
function openPopup(popup) {
    popup.classList.add('popup_opened');
    container.addEventListener('keydown', closePopupByEsc);
}

//Close popups

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    container.removeEventListener('keydown', closePopupByEsc);
}

//Popup Profile
function openPopupProfile() {
    openPopup(popupProfile);
    inputProfileName.setAttribute('value', blockName.textContent); 
    inputProfileJob.setAttribute('value', blockJob.textContent);
} 

function editProfileForm(evt) {
    evt.preventDefault();
    blockName.textContent = inputProfileName.value;
    blockJob.textContent = inputProfileJob.value;
    closePopup(popupProfile);
}

function addCardForm(evt) {
    evt.preventDefault();
    const cardFromInput = {name: inputNewCardName.value, link: inputNewCardLink.value}
    const card = new Card(cardFromInput, '#card')
    const generateCard = card.generateCard();
    cardsContainer.prepend(generateCard);
    closePopup(popupNewCard);
    formNewCard.reset();
    popupCardButtonSave.classList.add('popup__button-save_disabled')
};

//Add initial card
elementsInitial.forEach(element => {
    const card = new Card(element, '#card')
    const generateCard = card.generateCard();
    cardsContainer.prepend(generateCard);
})

//Profile Buttons
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', (event => closePopup(popupProfile)));
formProfile.addEventListener('submit', editProfileForm); 

//New Card Buttons 
buttonAddCard.addEventListener('click', e => openPopup(popupNewCard));
buttonClosePopupNewCard.addEventListener('click', (event => closePopup(popupNewCard)));
formNewCard.addEventListener('submit', addCardForm); 

//Popup Element Buttons
popupElementButton.addEventListener('click', (event => closePopup(popupElement)));

