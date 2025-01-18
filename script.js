const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");
//Validação do input
const validateInput = () =>{
    if(inputElement.value.trim().length > 0){
        return true;
    } else{
        return false;
    }
}

const handleAddTask = () =>{
    const inputisValid = validateInput();
    
    //Adicionar ações de erro caso o input esteja inválido
    if(!inputisValid){
        return inputElement.classList.add("error");
    }

    //Criando a estrutura de elementos para uma nova task pelo javascript
    const taskItemContainer = document.createElement("div"); 
    taskItemContainer.classList.add("task-item");

    const textContent = document.createElement("p");
    textContent.innerText = inputElement.value;

    //Adicionando evento ao clicar a na tarefa concluída
    textContent.addEventListener('click',() => handleclick(textContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    //Adicionando evento para deletar uma tarefa
    deleteItem.addEventListener('click',() => handleDeleteClick(textContent,taskItemContainer));

    //Add cada elemento na caixa de um item para formar a estrutura
    taskItemContainer.appendChild(textContent);
    taskItemContainer.appendChild(deleteItem);
    //Add cada nova task para a caixa dos items
    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
}

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }

  updateLocalStorage();
};

const handleclick = (taskContent) => {
    const tasks = tasksContainer.childNodes;
    for(const task of tasks){
        const currentTaskInBeingClicked = task.firstChild.isSameNode(taskContent);
        if(currentTaskInBeingClicked){
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
}

const handleDeleteClick = (taskContent,taskItemContainer) =>{
    const tasks = tasksContainer.childNodes;
    for(const task of tasks){
        const currentTaskInBeingClicked = task.firstChild.isSameNode(taskContent);
        if(currentTaskInBeingClicked){
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

const updateLocalStorage = () =>{
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map((task) =>{
        const content = task.firstChild; //Cada Item
        const isCompleted = content.classList.contains("completed"); //Situação da Tarefa
        return {description: content.innerText, isCompleted}
    });
    
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUserLocalStorage = () =>{
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    
    for(const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement("div"); 
        taskItemContainer.classList.add("task-item");

        const textContent = document.createElement("p");
        textContent.innerText = task.description; //task é um objeto, logo inputElement.value se altera para task.description

        //Verificando se uma tarefa recuperada do Local Storage foi marcada como concluída anteriormente.
        if(task.isCompleted){
            textContent.classList.add("completed");
        }

        textContent.addEventListener('click',() => handleclick(textContent));

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash-can");

        deleteItem.addEventListener('click',() => handleDeleteClick(textContent,taskItemContainer));

        taskItemContainer.appendChild(textContent);
        taskItemContainer.appendChild(deleteItem);
        tasksContainer.appendChild(taskItemContainer);
    }


}


refreshTasksUserLocalStorage()


//Evento para verificar a validação do input ao clicar no botão 
addTaskButton.addEventListener("click",() => handleAddTask())
//Evento para verificar a vlaidação do input ao realizar mudanças no input
inputElement.addEventListener("change",()=> handleInputChange());