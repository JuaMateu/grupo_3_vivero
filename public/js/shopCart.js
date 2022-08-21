window.addEventListener("load", () => {
  let products = JSON.parse(localStorage.getItem("products"));

  // Price

  /*
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += parseInt(product.price.substring(1, product.price.length));
  });

  let finalPrice = document.querySelector(".cart__total-price");
  finalPrice.innerText = "$" + totalPrice; 
  */

  // Product

  let cart = document.querySelector(".cart");
  let buttons = document.querySelector(".cart__buttons");

  if (products && products.length > 0) {
    products.forEach((product) => {
      let myProduct = document.createElement("div");
      cart.insertBefore(myProduct, buttons);
      myProduct.classList.add("cart__product");

      let detail = document.createElement("div");
      myProduct.appendChild(detail);
      detail.classList.add("cart__product-detail");

      let placeholder = document.createElement("div");
      detail.appendChild(placeholder);
      placeholder.classList.add("cart__product-image");

      let image = document.createElement("img");
      placeholder.appendChild(image);
      image.setAttribute("src", product.image.substring(22));
      image.setAttribute("alt", "Imagen Del Producto");

      let price = document.createElement("div");
      myProduct.appendChild(price);
      price.innerText = product.price;
      price.classList.add("cart__product-price");

      let quantity = document.createElement("div");
      myProduct.appendChild(quantity);
      quantity.classList.add("cart__product-quantity");

      let input = document.createElement("input");
      quantity.appendChild(input);
      input.setAttribute("type", "number");
      input.setAttribute("value", "1");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");

      let total = document.createElement("div");
      myProduct.appendChild(total);
      total.innerText = product.price;
      total.classList.add("cart__product-total");
    });
  } else {
    let message = document.createElement("div");
    cart.insertBefore(message, buttons);
    message.innerHTML =
      "<div>Tu carrito esta vacio.</div><a href='/products/shop'>Hace click aca para ver los productos que tenemos disponibles!<a/>";
    message.classList.add("cart__message");
  }
});
