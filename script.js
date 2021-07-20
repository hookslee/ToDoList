let addButton = document.getElementById("add-button"); 
addButton.addEventListener("click", addToDoItem); 

let clearButton = document.getElementById("clear-completed-button"); 
clearButton.addEventListener("click", clearCompletedToDoItems); 

let emptyListButton = document.getElementById("empty-button"); 
emptyListButton.addEventListener("click", emptyList); 

let saveButton = document.getElementById("save-button"); 
saveButton.addEventListener("click", saveList); 

let toDoEntryBox = document.getElementById("todo-entry-box"); 
var toDoList = document.getElementById("todo-list"); 

function addToDoItem() {
    //alert("Add Button has been clicked"); 
    
    let itemText = toDoEntryBox.value;  
    if(itemText.length > 0){
        newToDoItem(itemText, false); 
        toDoEntryBox.value = '';
    } else {
        alert('Please enter a task'); 
    }
}

function newToDoItem(itemText, completed) {
 
    let toDoItem = document.createElement("li"); 
    let toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText); 

    if(completed) {
        toDoItem.classList.add(completed); 
    }

    toDoList.appendChild(toDoItem); 
    toDoItem.addEventListener("dblclick", toggleToDoItemState); 
    saveList();
}


function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName('completed'); 
    while (completedItems.length > 0) {
        completedItems.item(0).remove(); 
    }
    saveList(); 
}


function emptyList() {
    let toDoItems = toDoList.children; 
    while(toDoItems.length > 0){
        toDoItems.item(0).remove(); 
    }
    saveList();
}


function saveList() {
    let toDos = [];

    for(let i = 0; i < toDoList.children.length; i++){
        let toDo = toDoList.children.item(i); 
        let toDoInfo;

        if (toDo.classList.contains('completed')) {
            toDoInfo = {
                'task': toDo.innerText, 
                'completed': toDo.classList.contains('completed')
            };
        } else {
            toDoInfo = {
                'task': toDo.innerText, 
                'completed': ''
            };
        }
        toDos.push(toDoInfo); 
    }
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

function loadList() {
    if(localStorage.getItem('toDos') !=null){
        let toDos = JSON.parse(localStorage.getItem('toDos'));
        for(let i = 0; i < toDos.length; i++){
            let toDo = toDos[i];
            if(toDo.completed) {
                newToDoItem(toDo.task, 'completed'); 
            } else {
                newToDoItem(toDo.task, 'outstanding');                  
            }
        }
    }
}

loadList(); 


function toggleToDoItemState () {
    if(this.classList.contains('completed')) {
        this.classList.remove('completed'); 
    } else {
        this.classList.add('completed'); 
    }
    saveList(); 
}