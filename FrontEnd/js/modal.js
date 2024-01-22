import { GenererTravaux } from "./index.js";

let modal = null;

export function OuvrirModal(works){
    const buttonOpen = document.querySelector(".open_modal");
    buttonOpen.addEventListener("click", function(event){
        event.preventDefault();
        
        if(modal === null){
            RefreshModalWorks(works);
            ChangeModalPage();
            FermerModal();
        }
        
        modal = document.querySelector(event.target.getAttribute("href"));
        modal.classList.remove("hide");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute('aria-model', 'true');
        
        
    });
}

export function RefreshModalWorks(works){
    document.querySelector(".modal_gallery").innerHTML = "";
    GenererTravaux(works, "modal");
}

function FermerModal(){
    const buttonClose = document.querySelectorAll(".close_modal");
    for(let i = 0; i < buttonClose.length; i++){
        buttonClose[i].addEventListener("click", function(event){
            event.preventDefault();
            modal.classList.add("hide");
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
        })
    }
}

function ChangeModalPage(){
    const addPage = document.querySelector(".add_window");
    const deletePage = document.querySelector(".delete_window");

    const buttonAddPage = document.querySelector(".btn_add");
    buttonAddPage.addEventListener("click", function(){
        deletePage.classList.add("hide");
        addPage.classList.remove("hide");   
    });

    const buttonReturn = document.querySelector(".btn_return");
    buttonReturn.addEventListener("click", function(){
        addPage.classList.add("hide");
        deletePage.classList.remove("hide");
    });
}



