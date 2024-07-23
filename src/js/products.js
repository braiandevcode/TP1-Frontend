//***************************LISTA PRODUCTOS************************************//
// GLOBALES
"use strict";
const products = document.getElementById("products");

// SE HACEN VARIAS LLAMADAS AL MISMO ARCHIVO, SE PODR´ÍA CREAR FUNCION REUTILIZABLE....

// FUNCION AUXILIAR QUE SE ENCARGA DE RENDERIZAR LA LISTA
const renderProducts = (resp) => {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("product-template").content;
  console.log(template);
  if (resp.length > 0) {

    resp.forEach((product) => {
      const clone = template.cloneNode(true);
      const textPrice = document.createTextNode(`${product.price_product}`);

      clone.querySelector("img").setAttribute("src", `${product.image_product}`);
      clone.querySelector("img").setAttribute("alt", `${product.name_product}`);
      clone.querySelector(".card-product__name").textContent = product.name_product;
      clone.querySelector(".card-product__price").textContent = product.price_product;
      clone.querySelector("label").setAttribute("for", `${product.id_product}`);
      clone.querySelector("input").setAttribute("id", `${product.id_product}`);
      clone.querySelector(".card-product__btn").setAttribute("data-id_product", `${product.id_product}`);
      fragment.append(clone);
    });

    products.append(fragment);
  }
};

// FUNCION PARA OBTENER PRODUCTOS
const getProducts = () => {
  fetch("/src/assets/json/products.json")
    .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
    .then((resp) => {
      // invocamos el renderizado
      renderProducts(resp);
    });
};

// INVOCAMOS LA FUNCION DE CONSULTA...
getProducts();

// EVENTO DE CLICK...
document.addEventListener("click", (e) => {
  e.preventDefault();
  // HAY QUE INTENTAR MODULARIZAR EL CODIGO PARA QUE SEA MAS LEGIBLE PERO LA LOGICA YA ESTA..
  // TAMBIEN PODRIAMOS CAMBIAR LOS ALERT POR UNA VENTANA MODAL PERSONALIZADA.

  // SI EL EVENTO DE CLICK ESTA ORIGINADO EN UN ELEMENTO CON LA CLASE DADA
  if (e.target.matches(".card-product__btn")) {
    // Mediante el id del atributo data podemos pasar el id correspondiente y asi acceder al valor de cada campo
    let inputElement = document.getElementById(`${e.target.dataset.id_product}`);
    let inputValue = parseInt(inputElement.value);
    fetch("/src/assets/json/products.json")
      .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
      .then((resp) => {
        let product = resp.find((productId) => productId.id_product == e.target.dataset.id_product);
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
      });

    inputElement.value = ""; // despues del evento limiamos los campos
  }
});