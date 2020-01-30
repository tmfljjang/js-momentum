const toDoForm = document.querySelector('.todo-js');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.todo-list');

const TODOS = 'todos';
let toDoArray = [];


function deleteToDo(event) {
	const btn = event.target;
	const delLi = btn.parentNode;
	toDoList.removeChild(delLi);
	const cleanToDo = toDoArray.filter(function(toDo){
		return toDo.id !== parseInt(delLi.id); 
	});
	toDoArray = cleanToDo;
	saveToDos();
}


function saveToDos(){
	localStorage.setItem(TODOS, JSON.stringify(toDoArray));
}

function paintToDos(text) {
	const li = document.createElement('li');
	const delBtn = document.createElement('button');
	const span = document.createElement('span');
	const newId = toDoArray.length + 1;
	span.innerText = text;
	delBtn.innerText = '❌';
	delBtn.addEventListener('click', deleteToDo);
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newId;
	toDoList.appendChild(li);
	const toDoObj = {
		text : text,
		id : newId
	};
	toDoArray.push(toDoObj);
	saveToDos();
}


function handleSubmit(event) {
	event.preventDefault();
	const todo = toDoInput.value;
	paintToDos(todo);
	toDoInput.value = '';
}


function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS);
	if(loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(todo){
			paintToDos(todo.text);
		});
	} 
}

function init() {
	loadToDos();
	toDoForm.addEventListener('submit', handleSubmit);
}

init();