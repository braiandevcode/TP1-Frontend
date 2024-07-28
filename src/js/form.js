//Referencias a selectores HTML
const inputs = document.querySelectorAll(".form__input");
const form = document.getElementById("form-contact");

//Carácteres para validar
const minCharacter = "abcdefghijklmnñopqrstuvwxyz";
const mayusCharacter = minCharacter.toUpperCase();
const simbols = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

//Arreglo que espera la información de los inputs
let information = [];

//Evento que se origina en el formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Reseteamos (vaciamos) el arreglo en cada evento submit para no acumular en caso de error de validación
    information.length = 0;
    //Le añadimos el valor de cada input al arreglo information
    inputs.forEach(input => {
        information.push(input.value);
    });
    console.log("Guardamos valores en arreglo con bucle forEach con un solo parametro: " + information);

    //Instanciamos Blob para guardar la información
    let blob = new Blob([information], { type: "text/plain;charset=utf-8" });

    //Guardamos en una variable el valor de teléfono
    let phone = information[3];

    let isValidate = true;
    //Recorremos los carácteres del contenido del input telefóno
    for (let i = 0; i < phone.length; i++) {
        //¿Incluye los carácteres?
        if (minCharacter.includes(phone[i]) || mayusCharacter.includes(phone[i]) || simbols.includes(phone[i])) {
            isValidate = false;
            break;
        }
    }

    if (isValidate) {
        console.log("Se descarga")
        //Libreria FileServer.js
        saveAs(blob, "contact.txt");
        //Le quitamos el valor al final, para limpiar
        form.reset();
        return true;
    }

    return false;

})

// console.log(information);