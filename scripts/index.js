let container = document.querySelector('.root');
let buttonClosePopup = container.querySelector('.popup__button-close');
let buttonOpenPopup = container.querySelector('.edit-button');
let popup = container.querySelector('.popup');
let blockName = container.querySelector('.profile__name');
let blockJob = container.querySelector('.profile__job');

function openPopup() {
    popup.classList.add('popup_opened');
    popup.classList.add('animation__open');
} //Opening Popup

function removeClasses() {
    popup.classList.remove('popup_opened');
    popup.classList.remove('animation__open')
    popup.classList.remove('animation__close');
} //Removing classes to close popup

function closePopup() {
    popup.classList.add('animation__close');
    setTimeout(removeClasses,500) //animation delay
} //Close Popup

function getSetValue() {
    let inputName = document.getElementById("name-input");
    let inputJob = document.getElementById("job-input");
    inputName.setAttribute('value', blockName.textContent) 
    inputJob.setAttribute('value', blockJob.textContent) 
} //Form input values

function formSubmitButton(evt) {
    evt.preventDefault();
    let inputName = document.getElementById("name-input");
    let inputJob = document.getElementById("job-input");
    blockName.innerText = inputName.value;
    blockJob.innerText = inputJob.value;
    closePopup();
} //Form submit

function setHeight(){
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );  
    popup.style.height = scrollHeight + 'px';
} //Height of page for popup height

setHeight();
getSetValue();

window.addEventListener(`resize`, event => {setHeight();}, false);
buttonClosePopup.addEventListener('click', closePopup);
buttonOpenPopup.addEventListener('click', openPopup);
popup.addEventListener('submit', formSubmitButton); 




