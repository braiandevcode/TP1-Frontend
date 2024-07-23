let nameUser = document.getElementById("name");
let surname = document.getElementById("surname");
let email = document.getElementById("email");
let tel = document.getElementById("tel");
let text = document.getElementById("text");
let btnSubmit = document.getElementById("btnSubmit");
let information = [];

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    information[0] = nameUser.value;
    information[1] = surname.value;
    information[2] = email.value;
    information[3] = tel.value;
    information[4] = text.value;

    let blob = new Blob([information], { type: "text/plain;charset=utf-8" });

    console.log("Su nombre es" + information[0])
    //Libreria FileServer.js
    saveAs(blob, "contact.txt");
})

console.log(information);