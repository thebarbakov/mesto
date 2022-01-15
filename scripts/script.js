let container = document.querySelector('.root');
let buttonClosePopup = container.querySelector('.popup__button-close');
let buttonOpenPopup = container.querySelector('.edit-button');
let popup = container.querySelector('.popup');
let blockName = container.querySelector('.profile__name');
let blockJob = container.querySelector('.profile__job');
let formSubmit = container.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    popup.classList.add('animation__open');
}

function removeClasses() {
    popup.classList.remove('popup_opened');
    popup.classList.remove('animation__open')
    popup.classList.remove('animation__close');
}

function closePopup() {
    popup.classList.add('animation__close');
    setTimeout(removeClasses,500)
}

function getSetValue() {
    let inputName = document.getElementById("name-input");
    let inputJob = document.getElementById("job-input");
    inputName.setAttribute('value', blockName.textContent) 
    inputJob.setAttribute('value', blockJob.textContent) 
}

function formSubmitButton(evt) {
    evt.preventDefault();
    let inputName = document.getElementById("name-input");
    let inputJob = document.getElementById("job-input");
    blockName.innerText = inputName.value;
    blockJob.innerText = inputJob.value;
    closePopup();
}

getSetValue();
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);
formSubmit.addEventListener('submit', formSubmitButton); 




