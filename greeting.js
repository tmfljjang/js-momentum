const form = document.querySelector('form');
const input = form.querySelector('input');
const greeting = document.querySelector('.greeting-hello');
const CURRENT_USER = 'currentUser';
const SHWOING_ON = 'showing';

function saveCurrentUser(text){
	localStorage.setItem(CURRENT_USER, text);
}

function paintCurrentUser(text) {
	form.classList.remove(SHWOING_ON);
	greeting.classList.add(SHWOING_ON);
	greeting.innerText = `Hello ${text}`;
	saveCurrentUser(text);
}

function handleSubmit() {
	event.preventDefault();
	const name = input.value;
	paintCurrentUser(name);
}

function askForName() {
	form.classList.add(SHWOING_ON);
	form.addEventListener('submit', handleSubmit);
}

function loadCurrentName() {
	const loadedCurrentName = localStorage.getItem(CURRENT_USER);
	if(loadedCurrentName == null) {
		askForName();
	} else {
		paintCurrentUser(loadedCurrentName);
	}
}

function init() {
	loadCurrentName();
}

init();