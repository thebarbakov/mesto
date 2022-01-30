//Root
const container = document.querySelector('.root');

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
    link: './images/photos/dombay.jpg'}];
const cardTemplate = document.querySelector('#card').content;
const popupNewCard = container.querySelector('.popup_new-card');
const buttonAddCard = container.querySelector('.profile__button-add');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');
const formNewCard = popupNewCard.querySelector('.popup__form');
const cardsContainer = container.querySelector('.elements');
const inputNewCardName = popupNewCard.querySelector("#card-name-input");
const inputNewCardLink = popupNewCard.querySelector("#card-link-input");

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

//Block scrolling 
const scrollToTop = () => window.scrollTo(scrollX, 0, );

function blockScrolling(){
    scrollToTop();
    window.addEventListener('scroll', scrollToTop);
};

//Popup Global
function openPopup(popup) {
    popup.classList.add('animation__open');
    popup.classList.add('popup_opened');
}
//Close popups
function closePopup(popup) {
    function removeClasses(popup) {
        popup.classList.remove('popup_opened');
        popup.classList.remove('animation__close');
    }
    popup.classList.remove('animation__open');
    popup.classList.add('animation__close');
    window.removeEventListener('scroll', scrollToTop);
    setTimeout(removeClasses, 500, popup);
}

//Popup Profile
function openPopupProfile() {
    openPopup(popupProfile);
    inputProfileName.setAttribute('value', blockName.textContent); 
    inputProfileJob.setAttribute('value', blockJob.textContent);
    blockScrolling();
} 

function editProfileForm(evt) {
    evt.preventDefault();
    blockName.innerText = inputProfileName.value;
    blockJob.innerText = inputProfileJob.value;
    closePopup(popupProfile);
}

//Popup Card
function createCard(name, link) {
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__title').textContent = name;
    newCard.querySelector('.element__image').setAttribute('src', link);
    newCard.querySelector('.element__image').setAttribute('alt', name);
    newCard.querySelector('.element__like').addEventListener('click',(event => event.target.classList.toggle('element__like_active')));
    newCard.querySelector('.element__delete').addEventListener('click', function(event){
        const element = event.target.closest('.element');
        element.classList.add('animation__close');
        setTimeout(() => element.remove(), 400);
    });
    newCard.querySelector('.element__image').addEventListener('click', function () {
        const nameTo = name;
        const linkTo = link;
        openPopupElement(nameTo, linkTo)
    });
    return newCard;
};

function openPopupElement(name, link) {
    popupElement.querySelector('.popup__image').setAttribute('src', link); 
    popupElement.querySelector('.popup__image').setAttribute('alt', name);
    popupElement.querySelector('.popup__description').textContent = name;
    openPopup(popupElement);
    blockScrolling();
};

function openPopupNewCard() {
    openPopup(popupNewCard);
    blockScrolling();
};

function addCardForm(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard(inputNewCardName.value, inputNewCardLink.value));
    closePopup(popupNewCard);
    inputNewCardName.value = '';
    inputNewCardLink.value = '';
};

//Add initial card
const createdInitialCards = elementsInitial.map(el => createCard(el.name, el.link));
createdInitialCards.forEach(element => cardsContainer.prepend(element));

//Profile Buttons
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', (event => closePopup(popupProfile)));
formProfile.addEventListener('submit', editProfileForm); 

//New Card Buttons 
buttonAddCard.addEventListener('click', openPopupNewCard);
buttonClosePopupNewCard.addEventListener('click', (event => closePopup(popupNewCard)));
formNewCard.addEventListener('submit', addCardForm); 

//Popup Element Buttons
popupElementButton.addEventListener('click', (event => closePopup(popupElement)));