const inputs = document.querySelectorAll(".form__input");
let information = [];

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    inputs.forEach(input => {
        information.push(input.value);
    });
    console.log("Guardamos valores en arreglo con bucle forEach con un solo parametro: " + information);

    let blob = new Blob([information], { type: "text/plain;charset=utf-8" });

    console.log("Su nombre es " + information[0])
    //Libreria FileServer.js
    saveAs(blob, "contact.txt");
})

console.log(information);