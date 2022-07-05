// Створити форму:
// - ім’я, перша буква велика
// - номер телефону, формат +380671234567
// - email, формат email
// - номер картки, 16 цифр
// Для перевірки використати регулярні вирази
const form = document.querySelector("form")
const inputName = form.elements["name"]
const inputNumber = form.elements["number"]
const inputEmail = form.elements["email"]
const inputCard = form.elements["card"]
const submit = document.querySelector(".btn-save")
function setError(element,error){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    errorMsg.innerHTML=error
    inputControls.classList.remove("validated")
    inputControls.classList.add("error")
    inputControls.classList.remove("success")
    
}
function setSuccess(element){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    inputControls.classList.add("success")
    inputControls.classList.add("validated")
    inputControls.classList.remove("error")
    errorMsg.innerHTML=""
}
function validate(){
    let bool = true
    bool = validateName(bool)
    bool = validateNumber(bool)
    bool = validateEmail(bool)
    bool = validateCard(bool)
    return bool
}
function validateName(bool){
    const inputNameValue = inputName.value.trim()
    const regexName = /^[A-Z А-Я]/
    if(inputNameValue===""){
        setError(inputName,"Не введене ім'я")
        return false
    }else if(!regexName.test(inputNameValue)){
        setError(inputName,"Ваше ім'я не з великої букви")
        return false
    }else{
        setSuccess(inputName)
        return bool
    }
}
function validateNumber(bool){
    const inputNumberValue = inputNumber.value.trim()
    const regexNumber =/^\+380\d{9}/
    if(inputNumberValue===""){
        setError(inputNumber,"Не введений номер телефону")
        return false
    }else if(inputNumberValue.length>13){
        setError(inputNumber,"Номер занадто довгий")
        return false
    }else if(!regexNumber.test(inputNumberValue)){// - номер телефону, формат +380671234567
        setError(inputNumber,"Номер не в форматі +380123456789")
        return false
    }else{
        setSuccess(inputNumber)
        return bool
    }
}
function validateCard(bool){
    const inputCardValue = inputCard.value.trim()
    const regexCard=/^\d{16}/
    if(inputCardValue===""){
        setError(inputCard,"Не введений номер картки")
        return false
    }else if(!regexCard.test(inputCardValue)){
        setError(inputCard,"номер картки не вірний")
        return false
    }else if(inputCardValue.length!==16){
        setError(inputCard,"Номер картки більше або менше 16 цифр")
        return false
    }else{
        setSuccess(inputCard)
        return bool
    }
}
function validateEmail(bool){
    const inputEmailValue = inputEmail.value.trim()
    const regexEmail=/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
    if(inputEmailValue===""){
        setError(inputEmail,"Не введений email")
        return false
    }else if(!regexEmail.test(inputEmailValue)){
        setError(inputEmail,"не вірний email")
        return false
    }else{
        setSuccess(inputEmail)
        return bool
    }
}
form.addEventListener("focusout",function(e){
    if(e.target.classList.contains("name")){
        validateName()
    }
    if(e.target.classList.contains("number")){
        validateNumber()
    }
    if(e.target.classList.contains("email")){
        validateEmail()
    }
    if(e.target.classList.contains("card")){
        validateCard()
    }
    let inputArr = Array.from(document.querySelectorAll(".input_controls input"))
    // const target = e.target.getAttribute("class")
    // const index = inputArr.findIndex((element)=>element.classList.contains(target))
    // inputArr.splice(index,1)
    inputArr = inputArr.map((element)=>{
        if(element.value.trim()!==""){
            return element
        }else{
            return 0
        }
    })
    inputArr = inputArr.filter((e)=>e!==0)
    function validateFilledInputs(element){//при автозаповненні щоб при втраті фокусу перевіряло
        if(element.classList.contains("name")){
            validateName()
        }else if(element.classList.contains("number")){
            validateNumber()
        }else if(element.classList.contains("email")){
            validateEmail()
        }else if(element.classList.contains("card")){
            validateCard()
        }
    }
    inputArr.forEach(validateFilledInputs)
})
form.addEventListener("submit",function(e){
    e.preventDefault()
    validate()
    if(validate()){
        console.log('passed')
    }
})

