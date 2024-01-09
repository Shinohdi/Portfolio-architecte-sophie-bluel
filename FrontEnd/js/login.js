const formLog = document.querySelector(".login_form");

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
    }).then(resp => resp.json())
    .then(response =>{
        if(response.token !== undefined){
            LogIn(response.token);
            console.log("oui");
        }else{
            UserError();
        }
    });
});

const errorElement = document.querySelector(".error");

function LogIn(token){
    errorElement.innerHTML = "";
    
    window.localStorage.setItem("token", token);
    window.location.assign("./index.html");
}

function UserError(){
    const errorText = document.createElement("p");
    errorText.innerText = "Erreur dans l’identifiant ou le mot de passe";

    errorElement.innerHTML = "";
    errorElement.appendChild(errorText);
}