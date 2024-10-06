const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

//Validação do input
const validateInput = () =>{
    if(inputElement.value.trim().length > 0){
        return true;
    } else{
        return false;
    }
}
//Adicionar ações de erro caso o input esteja inválido
const handleAddTask = () =>{
    const inputisValid = validateInput();

    if(!inputisValid){
        return inputElement.classList.add("error");
    }
}
//Retirar as ações de erro caso o input seja corrigido 
const handleInputChange = () => {
    const inputisValid = validateInput();

    if(inputisValid){
        return inputElement.classList.remove("error");
    }
}
//Evento para verificar a validação do input ao clicar no botão 
addTaskButton.addEventListener("click",() => handleAddTask())
//Evento para verificar a vlaidação do input ao realizar mudanças no input
inputElement.addEventListener("change",()=> handleInputChange());