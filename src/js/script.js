// *********************SALUDO DEL HOME***************************************************
// HORA ESTANDAR ARGENTINA
// constantes
const welcome = document.querySelector(".header-page__title");
const iconWelcome = document.querySelector(".header-page__welcome");
// variables
let hours = new Date().getHours();
let textNode;
// funcion auxiliar para crear nodo de texto.
const createText = (el, text) => {
    textNode = document.createTextNode(text);
    el.append(textNode);
    return el;
}
// funcion auxiliar para agregar y remover clases, uso de parametros REST
const updateClass = (el, classAdd, ...removeClass) => {
    if (el && classAdd) {
        if (removeClass.length == 0) {
            el.classList.add(classAdd);
        } else {
            el.classList.add(classAdd);
            removeClass.forEach(removeClassName => {
                el.classList.remove(removeClassName);
            });
        }
    }
};

if (hours >= 5 && hours <= 12) {
    createText(welcome, "¡Buenos Días!");
    updateClass(iconWelcome, "bi-brightness-alt-high-fill", ("bi-cloud-sun-fill", "bi-cloud-moon-fill"));
} else if (hours >= 13 && hours <= 19) {
    createText(welcome, "¡Buenas Tardes!");
    updateClass(iconWelcome, "bi-cloud-sun-fill", ("bi-cloud-moon-fill", "bi-brightness-alt-high-fill"));
} else {
    createText(welcome, "¡Buenas Noches!");
    updateClass(iconWelcome, "bi-cloud-moon-fill", ("bi-brightness-alt-high-fill", "bi-cloud-sun-fill"));
};

