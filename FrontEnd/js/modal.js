import { GenererTravaux } from "./index.js";

let modal = null;
let inTheAddPage = false;

export async function OuvrirModal(works){
    const buttonOpen = document.querySelector(".open_modal");
    buttonOpen.addEventListener("click", function(event){
        event.preventDefault();
        
        if(modal === null){
            RefreshModalWorks(works);
            ChangeModalPage();
            FermerModal();
            ImageUpload();
            SetupTitle();
            SetupCategory();       
        }
        
        modal = document.querySelector(event.target.getAttribute("href"));
        modal.classList.remove("hide");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute('aria-modal', 'true');

    });
}

export function RefreshModalWorks(works){
    document.querySelector(".modal_gallery").innerHTML = "";
    GenererTravaux(works, "modal");
    if(inTheAddPage){
        const addPage = document.querySelector(".add_window");
        const deletePage = document.querySelector(".delete_window");
        addPage.classList.add("hide");
        deletePage.classList.remove("hide");
        inTheAddPage = false;
        ReinitializeForm();
    }
}

function FermerModal(){
    const buttonClose = document.querySelectorAll(".close_modal");
    for(let i = 0; i < buttonClose.length; i++){
        buttonClose[i].addEventListener("click", function(event){
            event.preventDefault();
            modal.classList.add("hide");
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            ReinitializeForm();
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
        inTheAddPage = true;
    });
    
    const buttonReturn = document.querySelector(".btn_return");
    buttonReturn.addEventListener("click", function(){
        addPage.classList.add("hide");
        deletePage.classList.remove("hide");
        inTheAddPage = false;
        ReinitializeForm(); 
    });
}

function SetupTitle(){
    const titleInput = document.getElementById("titre");
    titleInput.addEventListener("change", function(){
        CheckFormValidation();
    })
}

async function SetupCategory(){
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json();

    const categorySelector = document.querySelector("#categorie")

    for(let i = 0; i < categories.length; i++){
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", categories[i].id);
        optionElement.innerText = categories[i].name;

        categorySelector.appendChild(optionElement);
    }

    categorySelector.addEventListener("change", function(){
        CheckFormValidation();
    })
}

function ImageUpload(){
    const input = document.getElementById("image");
    input.addEventListener("change", function(){
        const file = input.files;
        const fileSize = file[0].size / 1024 / 1024;
        if(fileSize > 4){
            file[0] = null;
            return;
        }
        if(file){
            const fileReader = new FileReader();
            const preview = document.querySelector(".preview");

            fileReader.onload = event =>{
                const uploader = document.querySelector(".add_image")
                uploader.classList.add("hide");
                preview.classList.remove("hide");
                preview.setAttribute("src", event.target.result);
                CheckFormValidation();
            }

            fileReader.readAsDataURL(file[0]);
        }
    })
}

function ReinitializeForm(){
    const preview = document.querySelector(".preview");
    if(preview.getAttribute("src") !== null){
        const uploader = document.querySelector(".add_image");
        uploader.classList.remove("hide");
        preview.removeAttribute("src");
        preview.classList.add("hide")
    }

    document.querySelector(".add_form").reset();
    CheckFormValidation(); 
}

function CheckFormValidation(){
    const imageInput = document.getElementById("image");
    const titleInput = document.getElementById("titre");
    const selectInput = document.getElementById("categorie")
    const buttonInput = document.querySelector(".btn_valid");

    if(imageInput.value === "" || titleInput.value === "" || selectInput.value === ""){
        if(!buttonInput.classList.contains("disable")){
            buttonInput.classList.add("disable");
        }
    }else{
        buttonInput.classList.remove("disable");
    }
}