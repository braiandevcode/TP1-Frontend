// LOCALIZACION DE SELECTORES HTML
const welcome = document.querySelector(".header-page__title");
const iconWelcome = document.querySelector(".header-page__welcome");

// VARIABLES
let hours = new Date().getHours(); // Objeto date instancia que nos provee js
let textNode;

// FUNCION AUXILIAR PARA CREAR NODO DE TEXTO
const createText = (el, text) => {
    textNode = document.createTextNode(text);
    el.append(textNode);
    return el;
}

// FUNCION AUXILIAR PARA AÑADIR CLASES
const addClass = (element, classAdd)=>{
    //ASEGURMAOS QUE EL ELEMENTO NO ESTE NULO
    if(element){
        element.classList.add(classAdd);
    }
};

// FUNCION AUXILIAR PARA REMOVER CLASES
const removeClass = (element,classRemove)=>{
    //ASEGURMAOS QUE EL ELEMENTO NO ESTE NULO
    if(element){
        welcome.classList.remove(classRemove);
    }
};

// FUNCION QUE VALIDA LA HORA LOCAL DEL USUARIO
const validationHours = ()=>{
    if (hours >= 5 && hours <= 12) {
        createText(welcome, "¡Buenos Días!");
        addClass(welcome, "bi-brightness-alt-high-fill");
        removeClass(welcome, "bi-cloud-sun-fill");
        removeClass(welcome, "bi-cloud-moon-fill");
    } else if (hours >= 13 && hours <= 19) {
        createText(welcome, "¡Buenas Tardes!");
        addClass(welcome, "bi-cloud-sun-fill");
        removeClass(welcome, "bi-cloud-moon-fill");
        removeClass(welcome, "bi-brightness-alt-high-fill");
    } else {
        createText(welcome, "¡Buenas Noches!");
        addClass(welcome, "bi-cloud-moon-fill");
        removeClass(welcome, "bi-brightness-alt-high-fill");
        removeClass(welcome, "bi-cloud-sun-fill");
    };
}

//SALUDO DE BIENVENIDA
const grettWelcome = ()=>{
   validationHours();
}

// funcion reutilizable para evento de foco
const eventFocus = (elEvent, classTargetElement, classNameModified)=>{
    const referenceElementEvent = document.querySelector(elEvent);
    const referenceElementModified= document.querySelector(classTargetElement);
    referenceElementEvent.addEventListener("focus", ()=>{
        addClass(referenceElementModified, classNameModified);
    });
    referenceElementEvent.addEventListener("blur", ()=>{
        removeClass(referenceElementModified, classNameModified);
    });
};

// SALUDAMOS
grettWelcome();

// UTILIZO FUNCION PARA EVENTO DE FOCO
eventFocus(".form-search__search", ".form-search", "form-search--focus");

