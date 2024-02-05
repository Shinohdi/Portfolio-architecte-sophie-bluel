import { OuvrirModal, RefreshModalWorks } from "./modal.js";

let works = window.localStorage.getItem("works");
let token = window.sessionStorage.getItem("token");

RefreshWorks();

export function GenererTravaux(data, type){
    for(let i = 0; i < data.length;i++){
        const article = data[i];
        
        switch(type){
            case "gallery":
                const galerie = document.querySelector(".gallery");
                const articleElement = document.createElement("figure");     
                const imageElement = document.createElement("img");
                imageElement.src = article.imageUrl;
                imageElement.alt = article.title;
                const captionElement = document.createElement("figcaption");
                captionElement.innerText = article.title;

                galerie.appendChild(articleElement);
                articleElement.appendChild(imageElement);
                articleElement.appendChild(captionElement);
            break;
            case "modal":
                const modal = document.querySelector(".modal_gallery");
                const articleModalElement = document.createElement("div");
                articleModalElement.classList.add("photo");
                const imageModalElement = document.createElement("img");
                imageModalElement.src = article.imageUrl;
                imageModalElement.alt = article.title;
                const buttonDeleteElement = document.createElement("div");
                buttonDeleteElement.classList.add("delete");
                buttonDeleteElement.innerHTML = `<i id = ${article.id} class="fa-solid fa-trash-can cliquable">`

                buttonDeleteElement.addEventListener("click", function(event){
                    DeleteWork(event);                
                })

                modal.appendChild(articleModalElement);
                articleModalElement.appendChild(imageModalElement);
                articleModalElement.appendChild(buttonDeleteElement);
            break;
        }

    }
}

const buttonTous = document.querySelector(".btn_all");
let buttonSelect = buttonTous;
buttonTous.classList.add("btn_selected")

buttonTous.addEventListener("click", function(){
    if(buttonSelect !== buttonTous){
        buttonSelect.classList.remove("btn_selected");
        buttonTous.classList.add("btn_selected");
        buttonSelect = buttonTous;
    }
    document.querySelector(".gallery").innerHTML = "";
    GenererTravaux(works, "gallery");
})

const buttonObjet = document.querySelector(".btn_obj");
buttonObjet.addEventListener("click", function(){
    changeWorks(buttonObjet, "1");
})

const buttonAppartement = document.querySelector(".btn_apt");
buttonAppartement.addEventListener("click", function(){
    changeWorks(buttonAppartement, "2");
})

const buttonHotel = document.querySelector(".btn_htr");
buttonHotel.addEventListener("click", function(){
    changeWorks(buttonHotel, "3");
})

if(token !== null){
    changeProjectPage();
    OuvrirModal(works);
    AddWork();
}

function changeWorks(button, id){
    if(buttonSelect !== button){
        buttonSelect.classList.remove("btn_selected");
        button.classList.add("btn_selected");
        buttonSelect = button;
    }
    const worksFilter = works.filter(function (photo){
        return photo.categoryId == id;
    });
    document.querySelector(".gallery").innerHTML = "";
    GenererTravaux(worksFilter, "gallery");
}

function LogOut(button){
    button.addEventListener("click", function(){
        window.sessionStorage.removeItem("token");
        token = null

        window.location.reload();
    })
}

async function DeleteWork(e){
    const id = e.target.id;
    if(id === ""){
        return
    }
    const response = await fetch("http://localhost:5678/api/works/" + id,{
        method: "DELETE",
        headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`},            
    });
     
    if(response.ok){
        window.localStorage.removeItem("works");
        works = null;
        document.querySelector(".gallery").innerHTML = "";
        RefreshWorks();
    }
}

function AddWork(){
    const formAdd = document.querySelector(".add_form");
    formAdd.addEventListener("submit", async function(event){
        event.preventDefault();
        if(document.querySelector(".btn_valid").classList.contains("disable")){
            return;
        }

        const requestData = new FormData();
        requestData.append("image", event.target.querySelector("[name=image]").files[0])
        requestData.append("title", event.target.querySelector("[name=titre]").value)
        requestData.append("category", parseInt(event.target.querySelector("[name=categorie]").value))

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`},
            body: requestData,
        });

        if(response.ok){
            window.localStorage.removeItem("works");
            works = null;
            document.querySelector(".gallery").innerHTML = "";
            RefreshWorks();
        }
    }) 
}

async function RefreshWorks(){
    if(works === null){
        const response = await fetch("http://localhost:5678/api/works");
        works = await response.json();
        
        const valeurWorks = JSON.stringify(works);
        window.localStorage.setItem("works", valeurWorks);
    }
    else
    {
        works = JSON.parse(works);
    }

    GenererTravaux(works, "gallery");
    RefreshModalWorks(works);
}

function changeProjectPage(){
    const editHead = document.querySelector(".edit_header");
    const editTitle = document.querySelector(".project_title");
    const buttonLog = document.querySelector(".btn_log");
    const filtresElements = document.querySelector(".filtres");

    const htmlEditHeader = `
    <div class = "banner">
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>
    </div>
    `;
    const htmlEditTitle = `
    <h2>Mes Projets</h2>
    <div class="lien">
        <i class="fa-regular fa-pen-to-square"></i>
        <a href="#modal" class="open_modal">modifier</p>
    </div>
    `;
    editHead.innerHTML = htmlEditHeader;
    buttonLog.innerHTML = "logout";
    editTitle.innerHTML = htmlEditTitle;
    filtresElements.innerHTML = "";
    
    LogOut(buttonLog);
}