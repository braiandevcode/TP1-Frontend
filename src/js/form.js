// IMPORTO FUNCION REUTILIZABLE QUE CREA LOS MODALES PASANDOLES UN INDICE DEL ARRAY DE OBJETOS QUE ESTA EN EL SCRIPT.JS
import { showModalsMessageAlert } from "./script.js";

// LOCALIZAOS ELEMENTOS DE HTML
const inputs = document.querySelectorAll(".form__input");
const form = document.getElementById("form-contact");
const btnSubmit=document.getElementById("btnSubmit");

//Carácteres para validar
const minCharacter = "abcdefghijklmnñopqrstuvwxyz";
const mayusCharacter = minCharacter.toUpperCase();
const simbols = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// OBJETO GLOBAL DE CONFIGURACION DE ID DE EMAILJS (NO TE CREAS QUE LO PODES USAR, PUEDO MODIFICARLO CUANDO SE ME PLAZCA :) )
const configEmailJs = {
  USER_ID:"skg2F-JZ2DoD0ktSv",
  SERVICE_ID:"service_mi7x9s5",
  TEMPLATE_ID:"template_ly6ajjl"
}
// ESTA FUNCION ESTA ENCAPSULADA Y ES AUTOEJECUTABLE ASI 
const initServiceEmailJs= () => emailjs.init(configEmailJs.USER_ID); // User ID de EmailJS

// INVOCAMOS LA FUNCION QUE INICIA LA HERRAMIENTA DE SERVICIO DE EMAIL
initServiceEmailJs();

// FUNCION PARA ENVIAR EMAIL USANDO Emailjs
const postEmail =(form)=>{
  // Enviamos el formulario usando EmailJS
  emailjs.sendForm(configEmailJs.SERVICE_ID, configEmailJs.TEMPLATE_ID, form)  // USO LIBRERIA LOS ID PASADOS SON DE MI LOGEO PARA PODER USAR.
    .then(response =>{
      showModalsMessageAlert(7) // LLAMOS A LA FUNCION Y LE PASAMOS EL INDICE 7 DEL ARRAY DE OBJETOS DE MODALES.
      btnSubmit.textContent = "Enviar";
    }
    ,(error)=> { // SEGUNDO PARAMETRO ES UNA CALLBACK (FUNCION ANONIMA) QUE ESPERA ESTA FUNCION DEL SERVICIO.
      console.log('FAILED...', error);
      showModalsMessageAlert(8);
  });
}

const validatePhone =(input)=>{ 
  const phone =  input.value;
  // el [...phone] convierte el texto de telefono a un elemento iterable para que sea un array y  luego usamos un metodo llamado some() de los arreglo.
  //(VISTOS EN CLASE) EVITANDOOS EL BUCLE FOR DE ESTA MANERA.
  const isChar = [...phone].some(char => minCharacter.includes(char) || mayusCharacter.includes(char) || simbols.includes(char));
  
  let isValidate = !isChar; //GUARDA EL VALOR NEGADO DE isChar (FALSE SI ES TRUE, TRUE SI ES FALSE)

  // SI ES CIERTO ENTONCES NO ES VALIDO , SE AGREGA EL MODAL PARA EL MENSAJE DE ERROR Y SE PREVIENE EL COMPORTAMIENTO
  // MOSTRAR MODAL DE ERROR SI isChar ES VERDADERO
  isChar ? showModalsMessageAlert(1) : null;
  
  if (isValidate) {
    btnSubmit.textContent = "Enviando...";
    postEmail(form); 
  }
}

// FUNCION PARA VALIDAR EL NAME DE LOS INPUT Y CONVERTIR CARACTERES A MINUSCULAS O MAYUSCULAS DEPENDIENDO SU CAMPO
const validateNameInput = (input)=>{
  const nameInput = input.name;
  let value = input.value;

  if (nameInput === "email") value = value.toLowerCase();
  else if (nameInput !== "tel") value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  else if (nameInput === "tel") validatePhone(input);
  input.value = value;  // ACTUALIZAMOS EL VALOR DEL INPUT EN EL DOM PARA QUE YA TENGA LOS VALORES MODIFICADOS.
}

// EVENTO SUBMIT!!
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el envío estándar del formulario
  //Le añadimos el valor de cada input al arreglo information
  inputs.forEach((input) => validateNameInput(input));
  form.reset(); // VACIAMOS LOS CAMPOS
});





