let container = document.querySelector('.root');
let buttonClosePopup = container.querySelector('.popup__button-close');
let buttonOpenPopup = container.querySelector('.profile__button_edit-button');
let popup = container.querySelector('.popup');
let blockName = container.querySelector('.profile__name');
let blockJob = container.querySelector('.profile__job');
let inputName = document.getElementById("name-input");
let inputJob = document.getElementById("job-input");
let form = document.forms.popup

function openPopup() {
    popup.classList.add('popup_opened');
} 
function closePopup() {
    popup.classList.remove('popup_opened');
}
function formSubmitButton(evt) {
    evt.preventDefault();
    let inputName = document.getElementById("name-input");
    let inputJob = document.getElementById("job-input");
    blockName.innerText = inputName.value;
    blockJob.innerText = inputJob.value;
    closePopup();
}
inputName.setAttribute('value', blockName.textContent);
inputJob.setAttribute('value', blockJob.textContent);
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);
form.addEventListener('submit', formSubmitButton); 




