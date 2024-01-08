const formLog = document.querySelector(".login_form");
export let token = "";

formLog.addEventListener("submit", async function (event) {
    event.preventDefault();

    const requestLog = { 
        email: event.target.querySelector("[name=adresse]").value,
        password: event.target.querySelector("[name=mdp]").value
    }

    const chargeUtile = JSON.stringify(requestLog);

    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    }).then((response) =>{
        if(response.status === 200){
            LogIn(response);
            console.log(response.token);
        }else{
            UserError();
        }
    });

});

const errorElement = document.querySelector(".error");

function LogIn(response){
    errorElement.innerHTML = "";
    //console.log(token);
    
    //window.location.href("./index.html");
}

function UserError(){
    const errorText = document.createElement("p");
    errorText.innerText = "Erreur dans l’identifiant ou le mot de passe";

    errorElement.innerHTML = "";
    errorElement.appendChild(errorText);
}