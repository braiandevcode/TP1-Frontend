// LISTA PRODUCTOS

const listProducts =[];
const listPrices=[];

const createListProducts = ()=>{

};
/*
<div class="card-product d-flex"> 
            <div class="card-product__main d-flex jc-spaceB">
                <div class="card-product__body">
                    <img class="card-product__image" src="./pan.jpg" alt="Imagen de pan">
                </div>
                <div class="card-product__description">
                    <h3 class="card-product__product">Pan</h3>
                    <p class="card-product__price">$1000<sup>99</sup></p>
                </div>
                <div class="card-product__footer">
                    <form class="card-product__form">
                        <div class="card-product__quantity">
                            <label for="quantity-product-id-1">Cantidad</label>
                            <input id="quantity-product-id-1" type="text" name="quantity-product-id-1" placeholder="Cantidad a comprar">
                        </div>
                        <button type="button" class="card-product__btn">Comprar</button>
                    </form>
                </div>
            </div>
        </div>

*/ 
// *********************SALUDO DEL HOME***************************************************
// HORA ESTANDAR ARGENTINA
// constantes
const welcome = document.querySelector(".header-page__title");
const iconWelcome = document.querySelector(".header-page__welcome");
// variables
let hours = new Date().getHours();
let textNode;
// funcion auxiliar para crear nodo de texto.
const createText = (el, text)=>{
    textNode = document.createTextNode(text);
    el.append(textNode);
    return el;
}
// funcion auxiliar para agregar y remover clases, uso de parametros REST
const updateClass= (el, classAdd, ...removeClass)=>{
    if(el && classAdd){
        if(removeClass.length == 0){
            el.classList.add(classAdd);
        }else{
            el.classList.add(classAdd);
            removeClass.forEach(removeClassName => {
                el.classList.remove(removeClassName);
            });
        }
    }
};

if(hours >= 20){
    createText(welcome, "¡Buenas Noches!");
    iconWelcome.classList.add();
    updateClass(iconWelcome, "bi-cloud-moon-fill", "bi-cloud-sun-fill", "bi-brightness-alt-high-fill");
}else if(hours < 20 && hours >= 13){
    createText(welcome,"¡Buenas Tardes!");
    updateClass(iconWelcome,  "bi-cloud-sun-fill", "bi-cloud-moon-fill", "bi-brightness-alt-high-fill");
}else{
    createText(welcome,"¡Buenos Días!");
    updateClass(iconWelcome,  "bi-brightness-alt-high-fill", "bi-cloud-sun-fill", "bi-cloud-moon-fill");
};

