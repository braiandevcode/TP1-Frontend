//***************************LISTA PRODUCTOS************************************//
"use strict";

// GLOBALES
const products = document.getElementById("products");

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

// FUNCION AUXILIAR QUE SE ENCARGA DE RENDERIZAR LA LISTA
const renderProducts = () => {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("product-template").content;
  console.log(template);
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
  // Mediante el id del atributo data podemos pasar el id correspondiente y asi acceder al valor de cada campo
  let inputElement = document.getElementById(`${e.target.dataset.idproduct}`);
  let inputValue = parseInt(inputElement.value);

  let product = productsJson.find((productId) => productId.id_product == e.target.dataset.idproduct); console.log(product);
  let stock = product.stock_product;
  let price = product.price_product;
  // aseguramos que lo que ingresen sea un numero
  if (!isNaN(inputValue)) {
    //si el valor del input es mayor al stock o menor o igual a cero no es posible.
    if (inputValue > stock || inputValue <= 0) {
      alert("No hay Stock para esa cantidad");
    } else {
      let total = inputValue * price; //opercaion
      alert(`El total de la compra de este producto es de: $${total}`);
    }
  } else {
    alert("El valor debe ser solo numérico");
  }
  inputElement.value = ""; // despues del evento limiamos los campos
}

// VALIDAR TARGET DE EVENTO
const validateTargetEvent = (e) => {
  // SI EL EVENTO DE CLICK ESTA ORIGINADO EN UN ELEMENTO CON LA CLASE DADA
  if (e.target.matches(".card-product__btn")) {
    e.preventDefault();
    validateDataProducts(e)
  }
}

// VENTOS DE CLICK
const clickEvents = () => {
  document.addEventListener("click", validateTargetEvent);
}

// EVENTO DE CARGA DE LA PAGINA
document.addEventListener("DOMContentLoaded", () => {
  // RENDERIZA LISTA DE PRODUCTOS.
  renderProducts();
  // EVENTO DE CLICK.
  clickEvents();
});

