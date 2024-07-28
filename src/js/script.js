"use strict";

// LOCALIZACION DE SELECTORES HTML
const welcome = document.querySelector(".header-page__title");
const iconWelcome = document.querySelector(".header-page__welcome");
const products = document.getElementById("products");
const slideShow = document.querySelector(".slide");
const rootHtml =document.documentElement; //HTML


// VARIABLES GLOBALES
let hours = new Date().getHours(); // Objeto date instancia que nos provee js
let textNode;
let currentPrice=0;

// *************************************FUNCIONES GLOBALES PARA USAR EN CUALQUIER CONTEXTO**************************//

// FUNCION AUXILIAR PARA CREAR NODO DE TEXTO
const createText = (el, text) => {
    textNode = document.createTextNode(text);
    el.append(textNode);
}

// FUNCION AUXILIAR PARA AÑADIR CLASES
const addClass = (element, classAdd)=>{
    //ASEGURAMOS QUE EL ELEMENTO NO ESTE NULO
    if(element){
        element.classList.add(classAdd);
    }
};

// FUNCION AUXILIAR PARA REMOVER CLASES
const removeClass = (element,classRemove)=>{
    //ASEGURAMOS QUE EL ELEMENTO NO ESTE NULO
    if(element){
        element.classList.remove(classRemove);
    }
};


// FUNCION REUTILIZABLE PARA EVENTOS DE FOCO
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

// ***************************FUNCIONALIDAD DE SALUDO DE BIENVENIDA*************************//

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

//*********************************FUNCIONALIDAD PARA LISTA DE PRODUCTOS*****************************************//

// ARREGLO DE PRODUCTOS
const productsJson = [
  {
    "image_product": "../assets/images/harina.jpg",
    "name_product": "Harina",
    "stock_product": 20,
    "price_product": 1000,
    "id_product": "product_1"
  },
  {
    "image_product": "../assets/images/cerveza.jpg",
    "name_product": "Cerveza",
    "stock_product": 8,
    "price_product": 1500,
    "id_product": "product_2"
  },
  {
    "image_product": "../assets/images/fideos.jpg",
    "name_product": "Fideos",
    "stock_product": 60,
    "price_product": 1300,
    "id_product": "product_3"
  },
  {
    "image_product": "../assets/images/arroz.jpg",
    "name_product": "Arroz",
    "stock_product": 10,
    "price_product": 1400,
    "id_product": "product_4"
  },
  {
    "image_product": "../assets/images/carne.jpg",
    "name_product": "Carne",
    "stock_product": 8,
    "price_product": 4500,
    "id_product": "product_5"
  },
  {
    "image_product": "../assets/images/leche.jpg",
    "name_product": "Leche",
    "stock_product": 8,
    "price_product": 1500,
    "id_product": "product_6"
  },
  {
    "image_product": "../assets/images/polenta.jpg",
    "name_product": "Polenta",
    "stock_product": 9,
    "price_product": 1200,
    "id_product": "product_7"
  },
  {
    "image_product": "../assets/images/gaseosa.jpg",
    "name_product": "Gaseosa",
    "stock_product": 12,
    "price_product": 1800,
    "id_product": "product_8"
  },
  {
    "image_product": "../assets/images/aceite.jpg",
    "name_product": "Aceite",
    "stock_product": 8,
    "price_product": 2000,
    "id_product": "product_9"
  },
  {
    "image_product": "../assets/images/lentejas.jpg",
    "name_product": "Lentejas",
    "stock_product": 8,
    "price_product": 1000,
    "id_product": "product_10"
  }
];

// ARREGLO  DE MENSAJES PARA MODAL
const contentInfoModal = [
    {
        "title":" Entrada invalida",
        "description": "El valor debe ser mayor o igual que cero. Por favor, ingrese un número positivo.",
        "icon": "bi-info-square-fill"
    },
    {
        "title":"Stock Insuficiente",
        "description": "No hay suficiente stock disponible para este producto.",
        "icon": "bi-exclamation-square-fill"
    },
]

const modalContainer = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
const modalInfo = document.querySelector('.modal__info');
const actionButton = document.querySelector('.modal__btn-action');

// // FUNCION REUTILIZABLE PARA CREAR LOS MODALS
// function showModal(content, actionText = "OK") {
//     modalInfo.innerHTML = content;
//     actionButton.textContent = actionText;
// };
  
function showInvalidInputModal() {
    const templateModal = document.getElementById("template-modal-error").content;
    const clone = templateModal.cloneNode(true);
    const infoModal = contentInfoModal[0];

    createText(clone.querySelector("h3"), infoModal.title);
    addClass(clone.querySelector("i"), infoModal.icon);

    clone.querySelector("p").textContent = infoModal.description;

    while(modalInfo.firstElementChild) {
        modalInfo.removeChild(modalInfo.firstElementChild);
    }

    modalInfo.append(clone);
    removeClass(modalContainer, "modal--hidden");
};
  
function showInsufficientStockModal() {
    const templateModal = document.getElementById("template-modal-error").content;
    const clone = templateModal.cloneNode(true);
    const infoModal = contentInfoModal[1];

    createText(clone.querySelector("h3"), infoModal.title);
    addClass(clone.querySelector("i"), infoModal.icon);

    clone.querySelector("p").textContent = infoModal.description;

    while(modalInfo.firstElementChild) {
        modalInfo.removeChild(modalInfo.firstElementChild);
    }

    modalInfo.append(clone);
    removeClass(modalContainer, "modal--hidden");

}
  
function showSuccessModal(product, quantity, total) {
    const templateModal = document.getElementById("template-modal-success").content;
    const clone = templateModal.cloneNode(true);
    
    clone.querySelector("img").src = product.image_product;
    clone.querySelector("img").alt = product.name_product;
    
    createText(clone.querySelector(".modal__subtitle-product"), "Producto");
    createText(clone.querySelector(".modal__subtitle-quantity"), "Cantidad");
    createText(clone.querySelector(".modal__subtitle-total"), "Total");
    
    // Asignar los textos a los elementos p que contienen los strong
    createText(clone.querySelector(".modal__product"), `: ${product.name_product}`);
    createText(clone.querySelector(".modal__quantity"), `: ${quantity}`);
    createText(clone.querySelector(".modal__total"), `: ${total}`);

    while(modalInfo.firstElementChild) {
        modalInfo.removeChild(modalInfo.firstElementChild);
    }

    modalInfo.append(clone);
    removeClass(modalContainer, "modal--hidden");
};

// FUNCION QUE SE ENCARGA DE PINTAR LA LISTA DE PRODUCTOS
const renderProducts = () => {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("product-template").content;
  // Pregunto primero si hay productos
  if (productsJson.length > 0) {
    productsJson.forEach((product) => {
        const clone = template.cloneNode(true);
        clone.querySelector("img").setAttribute("src", `${product.image_product}`);
        clone.querySelector("img").setAttribute("alt", `Imagen de ${product.name_product}`);
        clone.querySelector(".card-product__name").textContent = product.name_product;
        clone.querySelector(".card-product__stock").textContent = `Stock: ${product.stock_product}`;
        clone.querySelector(".card-product__price").textContent = `$${product.price_product}`;
        clone.querySelector("label").setAttribute("for", `${product.id_product}`);
        clone.querySelector("input").setAttribute("id", `${product.id_product}`);
        clone.querySelector(".card-product__btn").setAttribute("data-idproduct", `${product.id_product}`);
        fragment.append(clone);
    });

    products.append(fragment);
  }
};

// FUNCION QUE SE ENCARGA DE LA LOGICA DE OPERACIONES DE COMPRA DE PRODUCTOS
const validateDataProducts = (e) => {
    // VENTANA MODAL

    // Mediante el id del atributo data en el boton "comprar" hacemos referencia al id del input de forma dinamica.
    let inputElement = document.getElementById(`${e.target.dataset.idproduct}`);
    let cardReferenceId = document.querySelector(`[data-idproduct="${e.target.dataset.idproduct}"]`);
    let titleStock = cardReferenceId.parentElement.previousElementSibling.lastElementChild.firstElementChild;
    let inputValue = parseInt(inputElement.value);
  
    let product = productsJson.find((productId) => productId.id_product == e.target.dataset.idproduct); 

    let stock = product.stock_product;
    let price = product.price_product;

    //SOLO SI LOS CAMPOS TIENEN VALORES.   
    if(inputValue !== ""){
        // aseguramos que lo que ingresen sea un numero
        if (!isNaN(inputValue)) {
            //si el valor del input es mayor al stock o menor o igual a cero no es posible.
            if (inputValue < 0){
               showInvalidInputModal();
               removeClass(actionButton, "modal__btn-action--hidden");
            }else if(inputValue <= stock){ 
                stock-= inputValue;
                product.stock_product = stock;
                localStorage.setItem("stock", product.stock_product);
                localStorage.getItem("stock", product.stock_product);

                if(stock < 0){
                    showInsufficientStockModal();
                    removeClass(actionButton, "modal__btn-action--hidden");
                }else{
                    let total = inputValue * price; //operacion
                    console.log(`El total es de: $${total}`);
                    titleStock.textContent = `Stock: ${stock}`;

                   addClass(actionButton, "modal__btn-action--hidden");

                    // MODAL EN CASO SATISFACTORIO
                    showSuccessModal(product, inputValue, total);
    
                    // DESABILITO BOTON SI NO HAY STOCK
                    if (stock === 0) {
                        e.target.setAttribute("disabled", "true");
                        addClass(e.target, "card-product__btn--disabled");
                        e.target.textContent="Sin Stock";
                    }
                }
            }

            inputElement.value = ""; // despues del evento limiamos los campos
            return true;
        } 
        return false;
    }
}


//**********************************************FUNCIONALIDAD DE SLIDE*************************************************//

// FUNCION REUTILIZABLE PARA USO DE TRANSICION EN SLIDE
const handleSlideTransition = (insertMethod) => {
    if (typeof insertMethod !== 'function') {
        throw new Error('Lo que añadi no es un metodo!! Fijate bien wey!');
    }

    const transition = () => {
        // REMOVER CLASES DE TRANSICION Y TRASNLATE
        removeClass(slideShow, "slide--translate");
        removeClass(slideShow, "slide--transition");

        // ACTUALIZO PROPIEDADES EN VARIABLES CSS
        rootHtml.style.setProperty("--transition-slide", "none");
        rootHtml.style.setProperty("--translate-slide", 0);
        addClass(slideShow, "slide--reset");
        
        // FUNCION A EJECUTAR PARA AGREGAR ELEMENTOS HIJOS MEDIANTE UN METODO ESPECIFICO.
        insertMethod();

        // SE RESTAURA VARIABLE CSS DESPUES DE 30MS
        setTimeout(() => {
            rootHtml.style.setProperty("--transition-slide", "transform .3s ease-out");
            removeClass(slideShow, 'slide--reset');
        }, 10);
        
        // SE REMUEVE EVENTO DE TRANSICION PARA PODER VOLVER A INICIALIZAR
        slideShow.removeEventListener('transitionend', transition);
    }

    // EVENTO DE TRANSICION
    slideShow.addEventListener('transitionend', transition);
}

// FUNCION SIGUIENTE
const handleNext = () => {
    // tiene elementos hijos
    if(slideShow.children.length > 0) {
        const firstChild = slideShow.firstElementChild;
        const sizesSlide= firstChild.offsetWidth;
        rootHtml.style.setProperty("--translate-slide", `-${sizesSlide}px`);
 
        addClass(slideShow, 'slide--translate');
        addClass(slideShow, 'slide--transition');

        handleSlideTransition(()=> slideShow.append(firstChild));
    }
}
// FUNCION ATRAS
const handlePrev = () => {
    // tiene elementos hijos
    if (slideShow.children.length > 0) {
        const lastChild = slideShow.lastElementChild;
        const firstChild = slideShow.firstElementChild;
        const sizesSlide = firstChild.offsetWidth;
       
        rootHtml.style.setProperty("--translate-slide", `${sizesSlide}px`);
 
        addClass(slideShow, 'slide--translate');
        addClass(slideShow, 'slide--transition');

        handleSlideTransition(()=> slideShow.insertBefore(lastChild, firstChild));
    }
};

/*****************************************EVENTOS Y FUNCIONES PARA TODA LA PÁGINA*****************************************/

// VALIDAR TARGET DE EVENTO CLICK
const validateTargetEventClick = (e) => {
    // SI EL EVENTO DE CLICK ESTA ORIGINADO EN UN ELEMENTO CON LA CLASE DADA EJECUTAR LO CORRESPONDIENTE.

    // BOTON DE COMPRA DE PRODUCTOS
    if (e.target.matches(".card-product__btn")) {
        e.preventDefault();
        validateDataProducts(e);
    }

    //SLIDE SIGUIENTE
    if(e.target.matches(".bi-arrow-right-circle-fill")){
        e.preventDefault();
        handleNext();
    }

    if(e.target.matches(".modal__btn-action") || e.target.matches(".modal__btn-cancel")){
        addClass(modalContainer, "modal--hidden");
    }


    // SLIDE ATRAS
    if(e.target.matches(".bi-arrow-left-circle-fill")){
        e.preventDefault();
        handlePrev();
    }
}

// FUNCION PARA EVENTOS DE CLICKS
const clickEvents = () => {
  document.addEventListener("click", (e)=>{
    validateTargetEventClick(e);
    // console.log(e.target);
  });
}

//*****************************EVENTO DE CARGA DE LA PAGINA********************************
document.addEventListener("DOMContentLoaded", () => {
    // SALUDAMOS
    grettWelcome();

    // UTILIZO FUNCION PARA EVENTO DE FOCO
    eventFocus(".form-search__search", ".form-search", "form-search--focus");
    
    // EVENTO DE CLICK.
    clickEvents();

    // RENDERIZA LISTA DE PRODUCTOS SOLO CUANDO EL PATH SEA EL CORRESPONDIENTE.
    if(location.pathname === "/src/pages/products.html"){
        renderProducts();
    }
});

