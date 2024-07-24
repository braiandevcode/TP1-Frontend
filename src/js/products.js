//***************************LISTA PRODUCTOS************************************//
// GLOBALES
"use strict";
const products = document.getElementById("products");

// SE HACEN VARIAS LLAMADAS AL MISMO ARCHIVO, SE PODR´ÍA CREAR FUNCION REUTILIZABLE....

const productsJson = [
  {
    "image_product":"../assets/images/pan.jpg",
    "name_product":"Pan",
    "stock_product": 20,
    "price_product": 1000,
    "id_product":"product_1"
  },
  {
    "image_product":"../assets/images/cerveza.jpg",
    "name_product":"Cerveza",
    "stock_product": 8,
    "price_product": 1500,
    "id_product":"product_2"
  },
  {
    "image_product":"../assets/images/pan.jpg",
    "name_product":"Otro Pan",
    "stock_product": 60,
    "price_product": 1300,
    "id_product":"product_3"
  }
];

// FUNCION AUXILIAR QUE SE ENCARGA DE RENDERIZAR LA LISTA
const renderProducts = () => {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("product-template").content;
  console.log(template);
  if (productsJson.length > 0) {
    productsJson.forEach((product) => {
      const clone = template.cloneNode(true);
      clone.querySelector("img").setAttribute("src", `${product.image_product}`);
      clone.querySelector("img").setAttribute("alt", `${product.name_product}`);
      clone.querySelector(".card-product__name").textContent = product.name_product;
      clone.querySelector(".card-product__price").textContent = product.price_product;
      clone.querySelector("label").setAttribute("for", `${product.id_product}`);
      clone.querySelector("input").setAttribute("id", `${product.id_product}`);
      clone.querySelector(".card-product__btn").setAttribute("data-id", `${product.id_product}`);
      fragment.append(clone);
    });

    products.append(fragment);
  }
};


document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  // EVENTO DE CLICK...
  document.addEventListener("click", (e) => {
    // SI EL EVENTO DE CLICK ESTA ORIGINADO EN UN ELEMENTO CON LA CLASE DADA
    if (e.target.matches(".card-product__btn")) {
      e.preventDefault();
      // Mediante el id del atributo data podemos pasar el id correspondiente y asi acceder al valor de cada campo
      let inputElement = document.getElementById(`${e.target.dataset.id_product}`);
      let inputValue = parseInt(inputElement.value);
   
      let product = productsJson.find((productId) => productId.id_product == e.target.dataset.id_product);
      let stock = product.stock_product;
      let price = product.price_product;
      // aseguramos que lo que ingresen sea un numero
      if (!isNaN(inputValue)) {
        //si el valor del input es mayor al stock o menor o igual a cero no es posible.
        if (inputValue > stock || inputValue <= 0) {
          alert("No hay Stock para esa cantidad");
        } else {
          let total = inputValue * price; //opercaion
          alert(`El total de la compra de este producto es de: ${total}`);
        }
      } else {
        alert("El valor debe ser solo numérico");
      }
      inputElement.value = ""; // despues del evento limiamos los campos
    }
    // Evento al formulario
    
  });
});