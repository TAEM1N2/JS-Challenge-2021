const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const li= event.target.parentElement; //know who was clicked 
    li.remove(); // delete the parent of the button, li 
    toDos = toDos.filter (toDo => toDo.id !== parseInt(li.id));
    saveTodos();
}

function paintToDo(newTodo){
   const li = document.createElement("li"); //create li 
   li.id = newTodo.id;
   const span = document.createElement("span"); // create span
   span.innerText = newTodo.text;
   const button = document.createElement("button"); //create button 
   button.innerText = "❤" 
   button.addEventListener("click", deleteToDo); // make event for button 
   li.appendChild(span);// put the span inside of li 
   li.appendChild(button);
   toDoList.appendChild(li);// put li inside of body 
}


function handleToDoSubmit(event){
    event.preventDefault(); //preventDefault 
    console.log(toDoInput.value); // 
    const newTodo = toDoInput.value; 
    toDoInput.value = ""; 
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj); //배열에 id 속성을 지닌 newTodoObj 추가함 
    paintToDo(newTodoObj); // text 를 주는 것이 아니라 object 를 넣음 
    saveTodos(); 
};

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if (savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos); 
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}; 

