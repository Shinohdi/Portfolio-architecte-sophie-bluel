const response = await fetch("http://localhost:5678/api/works");
let works = await response.json();

function genererPhoto(works){
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

genererPhoto(works);

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
    genererPhoto(works);
})

const buttonObjet = document.querySelector(".btn_obj");

buttonObjet.addEventListener("click", function(){
    if(buttonSelect !== buttonObjet){
        buttonSelect.classList.remove("btn_selected");
        buttonObjet.classList.add("btn_selected");
        buttonSelect = buttonObjet;
    }
    const worksFilter = works.filter(function (photo){
        return photo.categoryId == "1";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPhoto(worksFilter);
})


const buttonAppartement = document.querySelector(".btn_apt");

buttonAppartement.addEventListener("click", function(){
    if(buttonSelect !== buttonAppartement){
        buttonSelect.classList.remove("btn_selected");
        buttonAppartement.classList.add("btn_selected");
        buttonSelect = buttonAppartement;
    }
    const worksFilter = works.filter(function (photo){
        return photo.categoryId == "2";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPhoto(worksFilter);
})

const buttonHotel = document.querySelector(".btn_htr");

buttonHotel.addEventListener("click", function(){
    if(buttonSelect !== buttonHotel){
        buttonSelect.classList.remove("btn_selected");
        buttonHotel.classList.add("btn_selected");
        buttonSelect = buttonHotel;
    }
    const worksFilter = works.filter(function (photo){
        return photo.categoryId == "3";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPhoto(worksFilter);
})