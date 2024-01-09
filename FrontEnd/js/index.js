let works = window.localStorage.getItem("works");
let token = window.localStorage.getItem("token");

changeProjectPage();

if(works === null){
    const response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    
    const valeurWorks = JSON.stringify(works);
    window.localStorage.setItem("works", valeurWorks);
}else{
    works = JSON.parse(works);
}

function GenererTravaux(works){
    for(let i = 0; i < works.length;i++){
        const article = works[i];

        const galerie = document.querySelector(".gallery");
        const articleElement = document.createElement("figure");
        //articleElement.dataset.id = article.id;

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = article.title;

        galerie.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(captionElement);
    }
}

GenererTravaux(works);

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
    GenererTravaux(works);
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
    GenererTravaux(worksFilter);
}


function LogOut(button){
    button.addEventListener("click", function(){
        window.localStorage.removeItem("token");
        token = null

        window.location.reload();
    })
}

function changeProjectPage(){
    const editHead = document.querySelector(".edit_header");
    const buttonLog = document.querySelector(".btn_log");

    if(token !== null){
        const htmlEdit = `
        <div class = "banner">
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Mode édition</p>
        </div>
        `;
        editHead.innerHTML = htmlEdit;
        buttonLog.innerHTML = "logout";
        
        LogOut(buttonLog);
    }

}