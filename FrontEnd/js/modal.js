import { GenererTravaux } from "./index.js";

let modal = null;

export function OuvrirModal(works){
    const buttonOpen = document.querySelector(".open_modal");
    buttonOpen.addEventListener("click", function(event){
        event.preventDefault();
        modal = document.querySelector(event.target.getAttribute("href"));
        modal.classList.remove("hide");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute('aria-model', 'true');

        RefreshModalWorks(works);
    });
}

export function FermerModal(){
    const buttonClose = document.querySelector(".close_modal");
    buttonClose.addEventListener("click", function(event){
        event.preventDefault();
        modal.classList.add("hide");
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal = null;
    })
}

export function RefreshModalWorks(works){
    if(modal !== null){
        document.querySelector(".modal_gallery").innerHTML = "";
        GenererTravaux(works, "modal");
    }
}


