import '../pages/index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import { elementsInitial } from '../utils/constants.js'

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
    }, form)

    formValidator.enableValidation();
})

const cardPopup = new PopupWithImage('.popup_element')

const createCard = (item) => {
    const newCard = new Card(item, '#card', ({name, link}) => {
        cardPopup.openPopup({name, link})
    })
    const newCardElement = newCard.generateCard()
    return newCardElement;
}

const cardList = new Section({
    items: elementsInitial,
    renderer: (item) => {
        cardList.addItem(createCard(item))
    }
}, '.elements')

cardList.render();

const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob: '.profile__job'
})

const profilePopup = new PopupWithForm('.popup_profile', (data) => { 
    userInfo.setUserInfo(data) 
    profilePopup.closePopup(); 
})  

const newCardForm = new PopupWithForm('.popup_new-card', (data) => {
    cardList.addItem(createCard({name: data.cardName, link: data.cardLink}))
    newCardForm.closePopup();
})



//Buttons

document.querySelector('.profile__button-edit').addEventListener('click',e => {
    document.querySelector('#profile-name-input').value = userInfo.getUserInfo().profileName
    document.querySelector('#profile-job-input').value = userInfo.getUserInfo().profileJob
    profilePopup.openPopup()
}); 

document.querySelector('.profile__button-add').addEventListener('click', e => newCardForm.openPopup());

