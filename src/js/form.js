const inputs = document.querySelectorAll(".form__input");
const form = document.getElementById("form-contact");

//Carácteres para validar
const minCharacter = "abcdefghijklmnñopqrstuvwxyz";
const mayusCharacter = minCharacter.toUpperCase();
const simbols = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

//Arreglo que espera la información de los inputsde contacto
let information = [];

form.addEventListener("submit", (e) => {
    e.preventDefault()
  //Reseteamos (vaciamos) el arreglo en cada evento submit para no acumular en caso de error de validación
  information.length = 0;
  //Le añadimos el valor de cada input al arreglo information
  inputs.forEach((input) => information.push(input.value));

  //Instanciamos Blob para guardar la información
  let blob = new Blob([information], { type: "text/plain;charset=utf-8" });

  //Guardamos en una variable el valor de teléfono
  let phone = information[3];

  let isValidate = true;
  //Recorremos los carácteres del contenido del input telefóno
  for (let i = 0; i < phone.length; i++) {
    //¿En las letras minusculas, mayusculas o simbolos tienen algun caracter de los ingresados en el campo telefono?
    if (
      minCharacter.includes(phone[i]) ||
      mayusCharacter.includes(phone[i]) ||
      simbols.includes(phone[i])
    ) {
      // SI ES CIERTO ENTONCES NO ES VALIDO.
      isValidate = false;
      break;
    }
  }

  if (isValidate) {
    //Libreria FileServer.js
    saveAs(blob, "contact.txt");

    // VACIAMOS LOS CAMPOS
    form.reset();
    return true;
  }
  return false;
});
