let starContainer = document.querySelectorAll(".star-container");
const submitButton= document.querySelector("#submit");
const message = document.querySelector("#message");
const submitSection = document.querySelector("#submitsection");
const troca = document.querySelector("#troca");

//Eventos quando se toca e passa o mouse por cima

let events={
    mouse:{
        over : "click",
    }, 
    touch:{
        over: "touchstart",
    }
};

let deviceType = "";
//Detectar um dispositivo de toque
const isTouchDevice = () => {
    try{
        // Tentataremos criar um evento de toque (se falhar em computadores e  mostra uma mensagem de erro)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    }
    catch(element){
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

starContainer.forEach((element, index) => {
        element.addEventListener(events[deviceType].over, () => {
            submitButton.disabled = false;
            if (element.classList.contains("inactive")){
            //Preencher estrela
            ratingUpdate(0, index, true)
        }else{
            //Estrelas padrões (remover a cor)
            ratingUpdate(index, starContainer.length -1, false);
        }
    });
});

const ratingUpdate = (start, end, active) =>{
    for (let i= start ; i<=end; i++){
        if (active){
            starContainer[i].classList.add("active")            
            starContainer[i].classList.remove("inactive")
            starContainer[i].firstElementChild.className= "fa-star fa-solid"
        }else{
            starContainer[i].classList.remove("active")
            starContainer[i].classList.add("inactive")
            starContainer[i].firstElementChild.className= "fa-star fa-regular"

        }
    }
    //Mensagem
    let activeElements = document.getElementsByClassName("active");
    submitButton.style.cursor="pointer";
    if (activeElements.length > 0){
        switch (activeElements.length) {
            case 1:
                message.innerText = "😫 Péssimo";
                break;

            case 2:
                message.innerText = "🙄 Ruim";
                break;

            case 3:
                message.innerText = "😐 Médio";
                break;

            case 4:
                message.innerText = "😎 Bom";
                break;

            case 5:
                message.innerText = "🤩 Excelente";
                break;
    

            default:
                break;
        }
    }
    else{
        message.innerText = "Avalie a sua experiência!!!";
    }
};

submitButton.addEventListener("click", () =>{
    submitSection.classList.remove("hide");
    submitSection.classList.add("show");
    submitButton.disabled=true;
    troca.classList.add("hide");
});

window.onload = () =>{
    submitButton.disabled = true;
    submitSection.classList.add("hide");
};
