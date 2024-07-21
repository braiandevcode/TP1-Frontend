//***************************LISTA PRODUCTOS************************************//
// GLOBALES
"use strict";
const products = document.getElementById("products");

// SE HACEN VARIAS LLAMADAS AL MISMO ARCHIVO, SE PODR´ÍA CREAR FUNCION REUTILIZABLE....

// FUNCION AUXILIAR QUE SE ENCARGA DE RENDERIZAR LA LISTA
const renderProducts = (res) => {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("product-template").content;
  console.log(template);
  if (res.length > 0) {
    // res.forEach(product =>{
    //     // creamos los elementos a cada vuelta del for
    //     const divCardProduct = document.createElement("div");
    //     const divCardProductMain = document.createElement("div");
    //     const divCardProductBody = document.createElement("div");
    //     const divCardProductFooter = document.createElement("div");
    //     const divCardProductDescription = document.createElement("div");
    //     const divCardProductForm= document.createElement("form");
    //     const img = document.createElement("img");
    //     const h3 = document.createElement("h3");
    //     const p = document.createElement("p");
    //     const quantity = document.createElement("div");
    //     const label = document.createElement("label");
    //     const input = document.createElement("input");
    //     const btn = document.createElement("button");
    //     const sup = document.createElement("sup");

    //     // se añaden los atributos y valores
    //     img.setAttribute("src", `${product.image_product}`);
    //     img.setAttribute("alt", `Imagen de ${product.name_product}`);

    //     divCardProductMain.classList.add("card-product__main", "d-flex", "jc-spaceB");
    //     divCardProductFooter.classList.add("card-product__footer");
    //     divCardProductBody.classList.add("card-product__body");
    //     divCardProductDescription.classList.add("card-product__description");
    //     h3.classList.add("card-product__name");
    //     p.classList.add("card-product__price");

    //     divCardProductForm.classList.add("card-product__form");
    //     quantity.classList.add("card-product__quantity");
    //     label.setAttribute("for", `quantity-product-id-${product.id_product}`);
    //     input.setAttribute("id", `quantity-product-id-${product.id_product}`);
    //     input.setAttribute("name", `quantity-product-id-${product.id_product}`);
    //     input.setAttribute("placeholder", "Cantidad a comprar");
    //     btn.classList.add("card-product__btn");
    //     btn.setAttribute("type", "button");
    //     divCardProduct.classList.add("card-product","d-flex");
    //     // btn.setAttribute("data-stock", `${product.stock_product}`);
    //     // btn.setAttribute("data-price", `${product.price_product}`);

    //     // nodos de textos a elementos
    //     btn.textContent= "Comprar";
    //     h3.textContent= product.name_product;
    //     p.textContent = product.price_product;
    //     sup.textContent = 99;

    //     // se agregan los elementos que deben ser contenidos
    //     divCardProductFooter.append(divCardProductForm);
    //     divCardProductForm.append(quantity);
    //     quantity.append(label);
    //     quantity.append(input);
    //     divCardProductForm.append(btn);
    //     divCardProductDescription.append(h3);
    //     p.append(sup);
    //     divCardProductDescription.append(p);
    //     divCardProductFooter.append(divCardProductDescription);
    //     divCardProductBody.append(img);
    //     divCardProductMain.append(divCardProductBody);
    //     divCardProductMain.append(divCardProductFooter);
    //     divCardProduct.append(divCardProductMain);
    //     fragment.append(divCardProduct);
    //     // console.log(product);
    // });
    res.forEach((product) => {
      const clone = template.cloneNode(true);
      const text = document.createTextNode(`${product.price_product}`);

      clone.querySelector("img").setAttribute("src", `${product.image_product}`);
      clone.querySelector("img").setAttribute("alt", `${product.name_product}`);
      clone.querySelector(".card-product__name").textContent =product.name_product;
      clone.querySelector(".card-product__price").prepend(text);
      clone.querySelector("sup").textContent = 99;
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
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((res) => {
        // invocamos el renderizado
        renderProducts(res);
    });
};

// INVOCAMOS LA FINCION DE CONSULTA...
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
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => {
            let product= res.find((productId) => productId.id_product == e.target.dataset.id_product);
            let stock = product.stock_product;
            let price= product.price_product;
            // aseguramos que lo que ingresen sea un numero
            if (!isNaN(inputValue)) {
                //si el valor del input es mayor al stock o menor o igual a cero no es posible.
                if (inputValue > stock || inputValue <= 0) {
                    alert("No hay Stock para esa cantidad");
                } else{
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