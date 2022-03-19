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

const initialCard = new Section({
    items: elementsInitial,
    renderer: (item) =>{
        const initCard = new Card(item, '#card', () => {
            console.log({name: initCard.name, link: initCard.link})
            const cardPopup = new PopupWithImage('.popup_element', {name: initCard.name, link: initCard.link})
            cardPopup.openPopup()
        })
        const cardElement = initCard.generateCard()
        initialCard.addItem(cardElement)
    }
}, '.elements')

initialCard.render();

const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob: '.profile__job'
})

const profilePopup = new PopupWithForm('.popup_profile', (e) => {
    e.preventDefault();
    userInfo.setUserInfo(profilePopup._getInputValues())
    profilePopup.closePopup();
})

const newCardForm = new PopupWithForm('.popup_new-card', (e) => {
    e.preventDefault();
    const newCard = new Section({
        items: [newCardForm._getInputValues()],
        renderer: (item) =>{
            const newItem = new Card({name: item.cardName, link: item.cardLink}, '#card',() => {
                const cardPopup = new PopupWithImage('.popup_element', {name: newItem.name, link: newItem.link})
                cardPopup.openPopup()
            })
            const newItemElement = newItem.generateCard()
            newCard.addItem(newItemElement)
        }
    }, '.elements')
    newCard.render();
    newCardForm.closePopup();
})

//Buttons

document.querySelector('.profile__button-edit').addEventListener('click',e => {
    document.querySelector('#profile-name-input').value = userInfo.getUserInfo().profileName
    document.querySelector('#profile-job-input').value = userInfo.getUserInfo().profileJob
    profilePopup.openPopup()
}); 

document.querySelector('.profile__button-add').addEventListener('click', e => newCardForm.openPopup());

