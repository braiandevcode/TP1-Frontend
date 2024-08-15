"use strict";

const d = document,
    // LOCALIZACION DE SELECTORES HTML
    welcome = d.querySelector(".header-page__title"),
    products = d.getElementById("products"),
    slideShow = d.querySelector(".slide"),
    rootHtml = d.documentElement,
    formPyment = d.getElementById("form-pyment"),
    modalContainer = d.querySelector('.modal'),  //SELECTORES DE MODALES
    modalInfo = d.querySelector('.modal__info'),
    actionButton = d.querySelector('.modal__btn-action'),
    modalOverlay = d.querySelector(".modal-overlay"),
    counterTextProduct = d.querySelector(".icon-cart__text");


// VARIABLES GLOBALES
let hours = new Date().getHours(),
    decrementStock = 0,
    countAmount = 0,
    counterProduct = 0;


//***ARREGLOS***//
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

// ARREGLO DE MENSAJES PARA MODAL
const contentInfoModal = [
    {
        "title": "Entrada invalida",
        "description": "El valor debe ser mayor que cero, Por favor, ingrese un número mayor que cero.",
        "icon": "bi-info-square-fill"
    },
    {
        "title": "Caracteres inválidos",
        "description": "Solo se admiten números. Por favor, ingrese un valor válido.",
        "icon": "bi-dash-circle-fill"
    },
    {
        "title": "Stock Insuficiente",
        "description": "No hay suficiente stock disponible para este producto.Por favor ingrese un rango válido al stock del producto.",
        "icon": "bi-exclamation-square-fill"
    },
    {
        "title": "Agregado",
        "description": "El producto se ha añadido al carrito exitosamente.",
        "icon": "bi-check-circle-fill"
    },

    {
        "title": "Cancelado",
        "description": "Su compra fue cancelada exitosamente!",
        "icon": "bi-check-circle-fill"
    },

    {
        "title": "Pago",
        "description": "Su pago se ha enviado con éxito!. Gracias por su compra",
        "icon": "bi-check-circle-fill"
    },
    {
        "title": "Campos vacios",
        "description": "Los campos no pueden estar vacios. Todos los campos deben estar llenos.",
        "icon": "bi-dash-circle-fill"
    },
    {
        "title": "Datos Enviados",
        "description": "Sus datos fueron enviados con exito.",
        "icon": "bi-check-circle-fill"
    }
]

// *************************************FUNCIONES GLOBALES PARA USAR EN CUALQUIER CONTEXTO**************************//

// FUNCION AUXILIAR PARA CREAR NODO DE TEXTO
const createText = (el, text) => {
    let textNode = d.createTextNode(text);
    el.append(textNode);
}

// FUNCION AUXILIAR PARA AÑADIR CLASES
const addClass = (element, classAdd) => element.classList.add(classAdd);

// FUNCION AUXILIAR PARA REMOVER CLASES
const removeClass = (element, classRemove) => element.classList.remove(classRemove);


// ***************************FUNCIONALIDAD DE SALUDO DE BIENVENIDA*************************//
// FUNCION QUE VALIDA LA HORA LOCAL DEL USUARIO
const validationHours = () => {
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
const grettWelcome = () => {
    validationHours();
}

//*********************************FUNCIONALIDAD PARA LISTA DE PRODUCTOS*****************************************//

// CONFIGURACION PARA CREAR MODALES
const configureModal = (info) => {
    const templateModal = d.getElementById("template-modal-alerts").content;
    const clone = templateModal.cloneNode(true);
    createText(clone.querySelector("h3"), info.title);
    addClass(clone.querySelector("i"), info.icon);
    clone.querySelector("p").textContent = info.description;

    while (modalInfo.firstElementChild) {
        modalInfo.removeChild(modalInfo.firstElementChild);
    };

    modalInfo.append(clone);
}

// FUNCION PARA MODAL DE MENSAJES
export const showModalsMessageAlert = (indexMessage) => {
    const infoModal = contentInfoModal[indexMessage];
    configureModal(infoModal);
    removeClass(modalContainer, "modal--hidden");
};

// FUNCION PARA MODAL DE INFORMACION DE COMPRA.
const showInfoPurchModal = (product, quantity, total) => {
    const templateModal = d.getElementById("template-modal-success").content;
    const clone = templateModal.cloneNode(true);
    clone.querySelector("img").src = product.image_product;
    clone.querySelector("img").alt = product.name_product;
    clone.querySelector(".modal__btn-cancel").setAttribute("data-id", product.id_product);
    clone.querySelector(".modal__btn-confirm").setAttribute("data-id", product.id_product);
    createText(clone.querySelector(".modal__subtitle-product"), "Producto");
    createText(clone.querySelector(".modal__subtitle-quantity"), "Cantidad");
    createText(clone.querySelector(".modal__subtitle-total"), "Total");
    createText(clone.querySelector(".modal__product"), `: ${product.name_product}`);
    createText(clone.querySelector(".modal__quantity"), `: ${quantity}`);
    createText(clone.querySelector(".modal__total"), `: $${total}`);

    while (modalInfo.firstElementChild) {
        modalInfo.removeChild(modalInfo.firstElementChild);
    }

    modalInfo.append(clone);
    removeClass(modalContainer, "modal--hidden");
};

// FUNCION AUX PARA DESABILITAR BOTON
const buttonDisabled = (btn, comparation) => {
    if (typeof comparation == "number") {
        if (comparation == 0) {
            btn.setAttribute("disabled", "true");
            addClass(btn, "card-product__btn--disabled");
            btn.textContent = "Sin Stock";
        }
        return true;
    }
    return false;
}

// FUNCION QUE SE ENCARGA DE PINTAR LA LISTA DE PRODUCTOS
const renderProducts = () => {
    const fragment = d.createDocumentFragment();
    const template = d.getElementById("product-template").content;
    // PREGUNTO PRIMERO SI HAY
    if (productsJson.length > 0) {
        productsJson.forEach((product) => {
            const clone = template.cloneNode(true);
            clone.querySelector(".card-product").setAttribute("data-card", `${product.id_product}`)
            clone.querySelector("img").setAttribute("src", `${product.image_product}`);
            clone.querySelector("img").setAttribute("alt", `Imagen de ${product.name_product}`);
            clone.querySelector(".card-product__name").textContent = product.name_product;
            clone.querySelector(".card-product__name").textContent = product.name_product;
            clone.querySelector(".card-product__stock").textContent = `Stock: ${product.stock_product}`;
            clone.querySelector(".card-product__stock").setAttribute("data-stock", product.stock_product);
            clone.querySelector(".card-product__price").textContent = `$${product.price_product}`;
            clone.querySelector("label").setAttribute("for", `${product.id_product}`);
            clone.querySelector("input").setAttribute("id", `${product.id_product}`);
            clone.querySelector(".card-product__btn").setAttribute("data-idproduct", `${product.id_product}`);
            fragment.append(clone);
        });

        products.append(fragment);
    }

    let outOfStockProducts = JSON.parse(localStorage.getItem("outStock")) || [];
    // PRODUCTOS SIN STOCK.
    outOfStockProducts.forEach(outOfStockProduct => {
        const cardElement = d.querySelector(`[data-card="${outOfStockProduct.idProduct}"]`);
        const buttonElement = d.querySelector(`[data-idproduct="${outOfStockProduct.idProduct}"]`);
        if (cardElement && buttonElement) {
            cardElement.querySelector("h5").textContent = "Sin stock";
            cardElement.querySelector("h5").dataset.stock = 0;
            buttonDisabled(buttonElement, 0);
        }
    });
};

// FUNCION AUXILIAR PARA CALCULAR EL TOTAL DE COMPRA EN CARRITO.
const operateAmountTotal = (amount) => {
    // LEER LOS VALORES DEL CARRITO Y CONVERTIRLOS A FORMATO JSON O ARREGLO VACÍO
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // SUMAMOS EL TOTAL DE LA COMPRA
    cartItems.forEach(sum => {
        amount += sum.total;
    });
    return amount;
}

//***RENDERIZADO DE LA LISTA DE PRODUCTOS AGREGADOS****
const renderCartItems = () => {
    const btnPyment = d.querySelector(".payment-btn");
    const btnDeleteCart = d.querySelector(".delete-btn");
    const backBtn = d.querySelector(".back-btn");

    const fragment = d.createDocumentFragment();

    const cartItemList = d.querySelector(".cart-body");
    const cartItemsStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

    const totalAmount = d.createElement("div");
    const titleAmount = d.createElement("h3");
    addClass(totalAmount, "card-total");
    addClass(totalAmount, "d-flex");
    addClass(totalAmount, "ai-center");
    addClass(totalAmount, "jc-center");
    addClass(titleAmount, "card-total__price");

    const total = operateAmountTotal(countAmount);
    titleAmount.textContent = `Total: $${total}`;
    totalAmount.append(titleAmount);

    const cardsContainer = d.createElement("div");
    addClass(cardsContainer, "cards");
    addClass(cardsContainer, "d-flex");

    // RECORRER LOS ELEMENTOS DE LA LISTA
    if (cartItemsStorage.length > 0) {
        cartItemsStorage.forEach(item => {
            const cardCart = d.createElement("div");
            const img = d.createElement("img");
            const cardContent = d.createElement("div");
            const name = d.createElement("h5");
            const quantity = d.createElement("p");
            const price = d.createElement("p");

            addClass(cardCart, "card-cart");
            addClass(cardCart, "d-flex");
            addClass(img, "card-cart__img");
            addClass(cardContent, "card-cart__content");
            addClass(cardContent, "d-flex");
            addClass(name, "card-cart__name");
            addClass(quantity, "card-cart__quantity");
            addClass(price, "card-cart__price");

            // IMAGEN DE PRODUCTO O IMAGEN POR DEFECTO
            img.src = item.image || '../assets/images/cart.png';
            img.alt = item.name;
            name.textContent = item.name;
            quantity.textContent = `Cantidad: ${item.quantity}`;
            price.textContent = `Precio: $${item.total}`;

            cardContent.appendChild(name);
            cardContent.appendChild(quantity);
            cardContent.appendChild(price);
            cardCart.appendChild(img);
            cardCart.appendChild(cardContent);
            cardsContainer.appendChild(cardCart);
        });
        fragment.appendChild(cardsContainer);
        fragment.appendChild(totalAmount);
    }

    cartItemList.appendChild(fragment);

    // LIMPIAR CARRITO 
    if (cartItemList.children.length == 0) {
        addClass(btnPyment, "payment-btn--hide");
        const cartEmpty = d.createElement('h3');
        addClass(cartEmpty, 'cart__empty')
        cartEmpty.textContent = "Aun no has añadido productos al carrito...";
        cartItemList.append(cartEmpty);
        return;
    }
    removeClass(btnPyment, "payment-btn--hide");
    removeClass(btnDeleteCart, "payment-btn--hide");
    removeClass(backBtn, "payment-btn--hide");
};

// FUNCION AUXILIAR PARA VALIDAR ID EN LOCALSTORAGE
const validateExistProduct = (infoArr, dataObject, prop, condition) => {
    // BUSCO EL INDICE DEL OBJETO
    let storedProductIndex = infoArr.findIndex(p => p[prop] == condition);
    // SI ES ENCONTRADO MODIFICAR VALORES SINO AGREGAR NUEVO OBJETO DE CARRITO.
    storedProductIndex !== -1 ? infoArr[storedProductIndex] = dataObject
        : infoArr.push(dataObject);
}

// GUARDAR EL ESTADO ACTUAL DE LOS PRODUCTOS.
const saveStockToLocalStorage = () => {
    // AGREGAR DATOS DE PRODUCTOS EN FORMATO TEXTO PLANO
    localStorage.setItem("productsStock", JSON.stringify(productsJson));
};

// FUNCION QUE SE ENCARGA DE LA LOGICA DE OPERACIONES DE COMPRA DE PRODUCTOS
const validateDataProducts = (e) => {
    // GUARDO EN VARIABLE EL ATRIBUTO DATA DEL ELEMENTO AL QUE SE ORIGINA EL EVENTO EN ESE MOMENTO.
    const dataAttributeId = e.target.dataset.idproduct;

    // MEDIANTE ESE VALOR DEL ATRIBUTO DATA LO USAMOS PARA LOCALIZAR AL INPUT CON EL MISMO VALOR EN SU ATRIBUTO ID.
    let inputElement = d.getElementById(`${dataAttributeId}`);

    // LOCALIZAMOS AL ELEMENTO CON EL SELECTOR QUE CONTENGA "data-idproduct" CON EL VALOR DINAMICO.
    let btnReferenceId = d.querySelector(`[data-idproduct="${dataAttributeId}"]`);

    // RECORREMOS EL ARBOL CON LA REFERENCIA DEL BOTON AL QUE SE ORIGINÓ EL EVENTO Y GUARDAMOS EN VARIABLE.
    let titleStock = btnReferenceId.parentElement.previousElementSibling.querySelector("h5");

    // GUARDAMOS EN VARIABLE EL VALOR DEL INPUT Y CONVERTIOS A NUMERO.
    let inputValue = parseInt(inputElement.value);

    // BUSCAMOS AL OBJETO QUE CUMPLA CON LA CONDICION DONDE EL ID DEL PRODUCTO DEBE SER IGUAL AL VALOR DEL ATRIBUTO DATA DEL ELEMENTO.
    let product = productsJson.find((productId) => productId.id_product == dataAttributeId);

    // GUARDAMOS EN VARIABLES LAS PROPIEDADES DE STOCK Y PRECIO DEL OBJETO EN CUESTIÓN.
    let stock = product.stock_product;
    let price = product.price_product;
    let idProduct = product.id_product;

    const infoProductStorage = JSON.parse(localStorage.getItem("info")) || [];

    // SI ES CERO O EL CAMPO ESTA VACIO
    if (inputElement.value == 0 || inputElement.value == "") return;

    //QUE EFECTIVAMENTE SEA UN NUMERO.
    if (!isNaN(inputValue)) {
        //SI EL VALOR ES MENOR A 0
        if (inputValue < 0) {
            showModalsMessageAlert(0);
            removeClass(actionButton, "modal__btn-action--hidden");
            return;
        }

        // SI VALOR DE INPUT ES MAYOR AL STOCK
        if (inputValue > stock) {
            showModalsMessageAlert(2);
            removeClass(actionButton, "modal__btn-action--hidden");
            return
        }

        // GUARDAMOS EN VARIABLE GLOBAL PARA OPERAR MAS TARDE.
        decrementStock = inputValue;
        let total = inputValue * price;
        stock -= inputValue;
        product.stock_product = stock;

        titleStock.textContent = `Stock: ${product.stock_product}`;
        titleStock.dataset.stock = product.stock_product;

        addClass(actionButton, "modal__btn-action--hidden");

        // MODAL EN CASO SATISFACTORIO
        showInfoPurchModal(product, inputValue, total);

        // DESABILITO BOTON
        buttonDisabled(e.target, stock);

        // INVOCO FUNCION PARA VERIFICAR SI EXISTE EL ID.
        validateExistProduct(infoProductStorage, { stock, price, idProduct }, "idProduct", idProduct);

        localStorage.setItem("info", JSON.stringify(infoProductStorage));

        // INVOCO PARA CARGAR DATOS ACTUALES HASTA AQUI LUEGO DE VALIDAR.
        saveStockToLocalStorage();
        return true;
    }

    showModalsMessageAlert(1);
    return false;
}
//*************************************FUNCIONALIDAD DE SLIDE*****************************************//

// FUNCION REUTILIZABLE PARA USO DE TRANSICION EN SLIDE
const handleSlideTransition = (callBackInsertElement) => {
    if (typeof callBackInsertElement !== 'function') {
        throw new MessageAlert('Lo que añadi no es un metodo!!');
    }

    // METODO DE TRANSICIÓN
    const transition = () => {
        // REMOVER CLASES DE TRANSICION Y TRASNLATE
        removeClass(slideShow, "slide--translate");
        removeClass(slideShow, "slide--transition");

        // ACTUALIZO PROPIEDADES EN VARIABLES CSS
        rootHtml.style.setProperty("--transition-slide", "none");
        rootHtml.style.setProperty("--translate-slide", 0);
        addClass(slideShow, "slide--reset");

        // FUNCION A EJECUTAR PARA AGREGAR ELEMENTOS HIJOS MEDIANTE UN METODO ESPECIFICO.
        callBackInsertElement();

        // SE RESTAURA VARIABLE CSS DESPUES DE 10MS
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

// FUNCION PARA ANIMACION DE ANUNCIO DESCUENTO
const animationTitle = () => {
    let containerTitleOff = d.querySelector(".section-brands__title");
    let title = d.querySelector(".section-brands__title h3");
    let durationAnim = (containerTitleOff.offsetWidth + title.offsetWidth) / 200;
    title.style.animationDuration = `${durationAnim}s`;
}

// FUNCION SIGUIENTE
const handleNext = () => {
    // tiene elementos hijos
    if (slideShow.children.length > 0) {
        const firstChild = slideShow.firstElementChild;
        const sizesSlide = firstChild.offsetWidth;
        rootHtml.style.setProperty("--translate-slide", `-${sizesSlide}px`);

        addClass(slideShow, 'slide--translate');
        addClass(slideShow, 'slide--transition');

        handleSlideTransition(() => slideShow.append(firstChild));
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

        handleSlideTransition(() => slideShow.insertBefore(lastChild, firstChild));
    }
};

// FUNCION QUE SE ENCARGA DE ACTUALIZAR EL CARRITO
const updateCart = (image, name, inputValue, total) => {
    // LEER LOS VALORES DEL CARRITO Y CONVERTIRLOS A FORMATO JSON O ARREGLO VACÍO
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    counterProduct++;
    let storedProductCart = cartItems.find(prod => prod.name == name);
    if (storedProductCart) {
        storedProductCart.quantity += inputValue;
        storedProductCart.total += total;
    } else {
        validateExistProduct(cartItems, { quantityUnit: counterProduct, image: image, name: name, quantity: inputValue, total: total }, "name", name);
    };

    // GUARDAR EL CARRITO ACTUALIZADO EN EL LOCALSTORAGE
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// FUNCION PARA CARGAR LOS PRODUCTOS EN ALMACENAMIENTO LOCAL.
const loadStockFromLocalStorage = () => {
    //OBTENER Y CONVERTIR A OBJETO JSON
    const storedProducts = JSON.parse(localStorage.getItem("info"));
    if (storedProducts) {
        storedProducts.forEach((storedProduct) => {
            const product = productsJson.find(p => p.id_product === storedProduct.idProduct);
            if (product) product.stock_product = storedProduct.stock;
        });
    }
};

// FUNCION QUE SE ENCARGA DE OPERAR Y DEVOLVER LOS VALORES QUITADOS AL STOCK (SOLO CUANDO SE CANCELA).
const refoundStock = (product, contentStock) => {
    // VOLVEMOS A AGREGAR EL VALOR DEL INPUT AL STOCK
    product.stock_product += decrementStock;
    contentStock.textContent = `Stock: ${product.stock_product}`;
    decrementStock -= product.stock_product;
    if (decrementStock < 0) decrementStock = 0;
}

/*****************************************EVENTOS Y FUNCIONES PARA TODA LA PÁGINA*****************************************/

// VALIDACIONES DE EVENTO POR EL TARGET

// FUNCION PARA MANEJAR EVENTO DE CANCELAR
const handleCancelEvent = (e) => {
    e.preventDefault();
    const targetId = e.target.dataset.id;
    const product = productsJson.find(product => product.id_product == targetId);
    const infoProductStorage = JSON.parse(localStorage.getItem("info")) || [];

    const inputElement = d.getElementById(`${targetId}`);
    const button = d.querySelector(`[data-idproduct="${targetId}"]`);
    const contentStock = inputElement.parentElement.firstElementChild;

    refoundStock(product, contentStock);

    let storedProduct = infoProductStorage.find(prod => prod.idProduct == targetId);
    if (storedProduct) {
        storedProduct.stock = product.stock_product;
    } else {
        validateExistProduct(infoProductStorage, { stock, price, idProduct: product.price_product }, "idProduct", targetId);
    }

    localStorage.setItem("info", JSON.stringify(infoProductStorage));

    button.removeAttribute("disabled");
    removeClass(button, "card-product__btn--disabled");

    addClass(modalContainer, "modal--hidden");
    removeClass(actionButton, "modal__btn-action--hidden");
    showModalsMessageAlert(4);

    inputElement.value = "";
}

//FUNCION PARA MANEJAR PRODUCTOS FUERA DE STOCK
const handleOutOfStock = (targetId, stock) => {
    let outOfStockProducts = JSON.parse(localStorage.getItem("outStock")) || [];
    outOfStockProducts.push({ idProduct: targetId, stock: stock });
    localStorage.setItem("outStock", JSON.stringify(outOfStockProducts));

    outOfStockProducts.forEach(product => {
        const cardId = d.querySelector(`[data-card="${product.idProduct}"]`);
        const btnIdproduct = d.querySelector(`[data-idproduct="${product.idProduct}"]`);
        const textStock = cardId.querySelector("h5");
        textStock.textContent = "Sin Stock";
        textStock.dataset.stock = 0;
        buttonDisabled(btnIdproduct, 0);
    });
}

// FUNCION DE EVENTO PARA CONFIRMAR COMPRA
const handleConfirmEvent = (e) => {
    e.preventDefault();
    let infoProductStorage = JSON.parse(localStorage.getItem("info")) || [];
    let cartItemsStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    const targetId = e.target.dataset.id;
    const product = productsJson.find(prod => prod.id_product == targetId);

    const stock = product.stock_product;
    const inputElement = d.getElementById(`${targetId}`);
    const inputValue = parseInt(inputElement.value);
    const addProductTotalCart = inputValue * product.price_product;

    const textStock = d.querySelectorAll(`[data-stock="${targetId}"]`);
    textStock.forEach(el => el.textContent = stock);

    updateCart(product.image_product, product.name_product, inputValue, addProductTotalCart);

    if (cartItemsStorage.length > 0) {
        let lastIndex = cartItemsStorage.length - 1;
        counterTextProduct.textContent = lastIndex + 1;
    }

    if (stock === 0) {
        handleOutOfStock(targetId, stock);
    }

    localStorage.setItem("info", JSON.stringify(infoProductStorage));
    showModalsMessageAlert(3);
    removeClass(actionButton, "modal__btn-action--hidden");
    inputElement.value = "";
}

// VALIDAR PAGO
const validatePyment = (e) => {
    // EN ESTA FUNCION SE PODRIAN HACER VARIAS VALIDACIONES PARA LOS CAMPOS.
    const inputs = d.querySelectorAll("#form-pyment input");
    const arrInputs = Array.from(inputs);
    let isEmpty = arrInputs.every(input => input.value === "");
    if (isEmpty) {
        showModalsMessageAlert(6)
    } else {
        showModalsMessageAlert(5);
        removeClass(modalOverlay, "modal-overlay--visible");
        setTimeout(emptyCart, 2000);
    }
};

// VALIDAR TARGET DE EVENTO CLICK
const validateTargetEventClick = (e) => {
    // SI EL EVENTO DE CLICK ESTA ORIGINADO EN UN ELEMENTO CON LA CLASE DADA EJECUTAR LO CORRESPONDIENTE.
    // EVENTO A BOTON AGREGAR
    if (e.target.matches(".card-product__btn")) {
        e.preventDefault();
        validateDataProducts(e);
    }

    //EVENTO A BOTON SIGUIENTE
    if (e.target.matches(".bi-arrow-right-circle-fill")) {
        e.preventDefault();
        handleNext();
    }

    // EVENTO A BOTON ATRAS
    if (e.target.matches(".bi-arrow-left-circle-fill")) {
        e.preventDefault();
        handlePrev();
    }

    // EVENTO AL BOTON OK (CERRAR MODAL)
    if (e.target.matches(".modal__btn-action")) {
        addClass(modalContainer, "modal--hidden");
    }

    if (e.target.matches(".payment-btn")) {
        addClass(modalOverlay, "modal-overlay--visible");
    }
    if (e.target.matches(".modal-payment__close")) {
        removeClass(modalOverlay, "modal-overlay--visible");
    }

    // VACIAR CARRITO
    if (e.target.matches(".delete-btn")) {
        emptyCart();
    }

    // EVENTO A BOTON CANCELAR
    if (e.target.matches(".modal__btn-cancel")) {
        handleCancelEvent(e);
    }

    // EVENTO AL DAR AL CONFIRMAR COMPRA
    if (e.target.matches(".modal__btn-confirm")) {
        handleConfirmEvent(e);
    }

    // ***********************SECCIÓN MISION ACORDEÓN*************************
    if (e.target.matches(".mision-section h2")) {
        const content = e.target.nextElementSibling;
        content.style.display === "none" ? content.style.display = "block" : content.style.display = "none";
    }
};

//VACIAR CARRITO 
const emptyCart = () => {
    let cartItemsStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemsStorage = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItemsStorage));
    location.reload();
}

// VALIDACION DE EVENTO SUBMIT
const validateTargetSubmit = (e) => {
    e.preventDefault();
    if (formPyment) {
        validatePyment();
        e.target.reset();
    }
};

// EVENTOS SUBMIT
const eventSubmits = () => d.addEventListener("submit", validateTargetSubmit);

// FUNCION PARA EVENTOS DE CLICKS
const clickEvents = () => d.addEventListener("click", validateTargetEventClick);

const validateMedia = (sizeDisplay) => {
    const media = window.matchMedia(sizeDisplay);
    if (media.matches == true) {
        clickEvents();
    }
};

// FUNCIÓN PARA MANTENER LINK ACTIVO
const activeLink = () => {
    const navLinks = d.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) addClass(link, 'active');
        else removeClass(link, 'active');
    });
}

// FUNCION PARA VALIDAR RUTA EN LA QUE NOS ENCONTRAMOS Y QUE NO DE MessageAlertES EN CONSOLA.
const locationPathName = (routeGit, routeLocal, callback) => {
    let page = location.pathname === routeGit || location.pathname === routeLocal
    if (page) callback();
}

// FUNCIÓN QUE SE ENCARGA DE INICIAR LAS PÁGINAS
const initPage = () => {
    let routeFolderGit = "/TP1-Frontend/src/pages";
    let routeFolderLocal = "/src/pages"
    //OBTENER DATOS ACTUALES DEL ALMACENAMIENTO
    loadStockFromLocalStorage();

    //MEDIA
    validateMedia("(max-width:768px)");

    // SALUDAMOS
    grettWelcome();

    // EVENTO SUBMIT
    eventSubmits();

    // EVENTO DE CLICK.
    clickEvents();

    locationPathName(`${routeFolderGit}/index.html`, `${routeFolderLocal}/index.html`, () => animationTitle());
    locationPathName(`${routeFolderGit}/products.html`, `${routeFolderLocal}/products.html`, () => renderProducts());
    locationPathName(`${routeFolderGit}/shop.html`, `${routeFolderLocal}/shop.html`, () => renderCartItems());

    // LINK ACTIVO
    activeLink();
}

//*****************************EVENTO DE CARGA DE LA PAGINA********************************
d.addEventListener("DOMContentLoaded", initPage);
