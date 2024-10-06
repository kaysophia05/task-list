const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".tasks-container");
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

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    //Add cada elemento na caixa de um item para formar a estrutura
    taskItemContainer.appendChild(textContent);
    taskItemContainer.appendChild(deleteItem);
    //Add cada nova task para a caixa dos items
    taskContainer.appendChild(taskItemContainer);

}
const handleInputChange = () => {
    const inputisValid = validateInput();
    
    //Retirar as ações de erro caso o input seja corrigido 
    if(inputisValid){
        return inputElement.classList.remove("error");
    }
}
//Evento para verificar a validação do input ao clicar no botão 
addTaskButton.addEventListener("click",() => handleAddTask())
//Evento para verificar a vlaidação do input ao realizar mudanças no input
inputElement.addEventListener("change",()=> handleInputChange());