import '../pages/index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js';
import {addButton, editButton, photoOverllay, profileAvatarInput, profileJobInput, profileNameInput} from '../utils/constants.js'

let userId
let loadingStart

const renderLoading = (isLoading, validateForm) => {
    if(validateForm.buttonElement.textContent !== 'Сохранение...') {
        loadingStart = validateForm.buttonElement.textContent
    }
    if(isLoading){
        validateForm.disableSubmitButton()
        validateForm.buttonElement.textContent = 'Сохранение...'
    } else {
        validateForm.enableSubmitButton()
        validateForm.buttonElement.textContent = loadingStart
    }
}

const api = new Api(
    {
        urlRequest: 'https://nomoreparties.co/v1/cohort-39',
        headers: {
            'authorization': 'c194112f-b44f-441c-9a8f-47ca2f04bd5c',
            'Content-Type': 'application/json'
        }
    }
)

api.getInitialInfo()
.then(res => {
    userInfo.setUserInfo({name: res[0].name, about: res[0].about})
    userInfo.setUserAvatar({avatar: res[0].avatar})
    userId = res[0]._id   
    cardList.render(res[1]);
})
.catch(rej => console.error((`Error: ${rej.status}`)))

const formsArray = document.querySelectorAll('.popup__form')

const formValidator = {};
formsArray.forEach( (form) =>{
        formValidator[form.getAttribute('name')] = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        fieldsetList: '.popup__set',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_disabled',
        inputErrorClass: 'popup__input-error_active',
        inputWindowErrorClass: 'popup__input_error',
    }, form)
    formValidator[form.getAttribute('name')].enableValidation();
})

const cardPopup = new PopupWithImage('.popup_element')

const cardList = new Section(
    (item) => {
        cardList.addItem(createCard(item))
    }
, '.elements')

const createCard = (item) => {
    const newCard = new Card(item, '#card', 
    ({name, link}) => {
        cardPopup.openPopup({name, link})
    },
    userId,
    (cardId, element) => { // HandeCardDelete
        deletePopup.setSubmitAction(() => {
            renderLoading(true, formValidator.cardDelete)
            api.deleteCard(cardId)
            .then( () => {
                element.remove()
                deletePopup.closePopup()
            })
            .catch(rej => console.error((`Error: ${rej.status}`)))
            .finally( () => renderLoading(false, formValidator.cardDelete))
        })
        deletePopup.openPopup()
    },
    (element, cardId, likes) => { //HandleCardLike
        element.querySelector('.like__button').addEventListener('click',(e => {
            if(likes.find( el => el._id == userId)){
                api.setRemoveLike(cardId)
                .then((res) => {
                    likes = res.likes
                    element.querySelector('.like__counter').textContent = res.likes.length
                    element.querySelector('.like__button').classList.remove('like__button_active')
                })
                .catch(rej => console.error((`Error: ${rej.status}`)))
            } else {
                api.setCardLike(cardId)
                .then((res) => {
                    likes = res.likes
                    element.querySelector('.like__counter').textContent = res.likes.length
                    element.querySelector('.like__button').classList.add('like__button_active')
                })
                .catch(rej => console.error((`Error: ${rej.status}`)))
            }
        }));
    })
    const newCardElement = newCard.generateCard()
    return newCardElement;
}

const deletePopup = new PopupWithForm('.popup_delete')

const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob: '.profile__job',
    selectorAvatar: '.profile__photo'
})

const profilePopup = new PopupWithForm('.popup_profile',(data) => {
    renderLoading(true, formValidator.popupProfile)
    api.setUserInfo({name: data.profileName, about: data.profileJob})
    .then(res => {
        userInfo.setUserInfo(res)
        profilePopup.closePopup();
    })
    .catch(rej => console.error((`Error: ${rej.status}`)))
    .finally(() => renderLoading(false, formValidator.popupProfile))
})  

const avatarPopup = new PopupWithForm('.popup_profile-avatar',(data) => {
    renderLoading(true, formValidator.avatarUpdate)
    api.setUserAvatar({avatar: data.avatarLink})
    .then(res => {
        userInfo.setUserAvatar(res)
        avatarPopup.closePopup(); 
    }) 
    .catch(rej => console.error((`Error: ${rej.status}`))) 
    .finally( () => renderLoading(false, formValidator.avatarUpdate))
})  

const newCardForm = new PopupWithForm('.popup_new-card', (data) => {
    renderLoading(true, formValidator.popupNewCard)
    api.addCard({name: data.cardName, link: data.cardLink})
    .then(data => {
        cardList.render([(data)])
        newCardForm.closePopup();
        formValidator.popupNewCard.disableSubmitButton()
    })
    .catch(rej => console.error((`Error: ${rej.status}`))) 
    .finally(() => renderLoading(false, formValidator.popupNewCard))
})

//Buttons

editButton.addEventListener('click', e => {
    profileNameInput.value = userInfo.getUserInfo().profileName
    profileJobInput.value = userInfo.getUserInfo().profileJob
    profilePopup.openPopup()
}); 

photoOverllay.addEventListener('click', e => {
    profileAvatarInput.value = userInfo.getUserInfo().profileAvatar
    avatarPopup.openPopup()
}); 

addButton.addEventListener('click', e => newCardForm.openPopup());

