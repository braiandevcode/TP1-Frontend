// *********************SALUDO DEL HOME***************************************************
// HORA ESTANDAR ARGENTINA
// constantes
const welcome = document.querySelector(".header-page__title");
const iconWelcome = document.querySelector(".header-page__welcome");

// variables
let hours = new Date().getHours(); // Objeto date instancia que nos provee js
console.log(hours);
let textNode;

// funcion auxiliar para crear nodo de texto.
const createText = (el, text) => {
    textNode = document.createTextNode(text);
    el.append(textNode);
    return el;
}


// SALUDO DE BIENVENIDA
if (hours >= 5 && hours <= 12) {
    createText(welcome, "¡Buenos Días!");
    welcome.classList.add("bi-brightness-alt-high-fill");
    welcome.classList.remove("bi-cloud-sun-fill");
    welcome.classList.remove("bi-cloud-moon-fill");
} else if (hours >= 13 && hours <= 19) {
    createText(welcome, "¡Buenas Tardes!");
    welcome.classList.add("bi-cloud-sun-fill");
    welcome.classList.remove("bi-cloud-moon-fill");
    welcome.classList.remove("bi-brightness-alt-high-fill");
} else {
    createText(welcome, "¡Buenas Noches!");
    welcome.classList.add("bi-cloud-moon-fill");
    welcome.classList.remove("bi-brightness-alt-high-fill");
    welcome.classList.remove("bi-cloud-sun-fill");
};


document.querySelector(".form-search__search").addEventListener("focus", ()=>{
    document.querySelector(".form-search").classList.add("form-search--focus");
});
document.querySelector(".form-search__search").addEventListener("blur", ()=>{
    document.querySelector(".form-search").classList.remove("form-search--focus");
});