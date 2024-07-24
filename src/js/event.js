let nameUser = document.getElementById("name");
let surname = document.getElementById("surname");
let email = document.getElementById("email");
let tel = document.getElementById("tel");
let text = document.getElementById("text");
let btnSubmit = document.getElementById("btnSubmit");

const inputs = document.querySelectorAll(".form input");
let information = [];

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    information[0] = nameUser.value;
    information[1] = surname.value;
    information[2] = email.value;
    information[3] = tel.value;
    information[4] = text.value;

    //*****UNA FORMA QUE TE PERMITE EVITAR LINEAS DE CODIGO*******

    // MANERA 1 FOREACH CON UN SOLO PARAMETRO
    // inputs.forEach(input =>{
    //     information.push(input.value);
    // });
    // console.log("Guardamos valores en arreglo con bucle forEach con un solo parametro" + information);

    // *****MANERA 2 FOREACH CON DOS LOS VALORES DEL ARREGLO Y SIN INDICE******
    // inputs.forEach((input, index) =>{
    //     information[index] = input.value;
    // });
    // console.log("Guardamos valores en arreglo con bucle forEach pasando 2 parametros" + information);

    // MANERA 3 DE LA FORMA TRADICIONAL***
    for(let i=0; i < inputs.length; i++){
        information[i] = inputs[i].value;
    }
    console.log("Guardamos valores en arreglo con bucle comun " + information);


    let blob = new Blob([information], { type: "text/plain;charset=utf-8" });

    console.log("Su nombre es" + information[0])
    //Libreria FileServer.js
    saveAs(blob, "contact.txt");
})

console.log(information);