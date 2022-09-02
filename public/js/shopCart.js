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
      let myPrice = parseInt(
        product.price.substring(1, product.price.length).replace(",", "")
      );

      let myProduct = document.createElement("div");
      cart.insertBefore(myProduct, buttons);
      myProduct.setAttribute("id", product.id);
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
      input.setAttribute("value", product.quantity);
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");

      let deleteButton = document.createElement("a");
      quantity.appendChild(deleteButton);
      deleteButton.setAttribute("id", "delete-button");
      deleteButton.setAttribute("href", "");

      let icon = document.createElement("i");
      deleteButton.appendChild(icon);
      icon.classList.add("icon");
      icon.classList.add("cart__icon");
      icon.setAttribute("id", "trash");

      let total = document.createElement("div");
      myProduct.appendChild(total);
      total.innerText =
        "$" +
        (myPrice * product.quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        ".00";
      total.classList.add("cart__product-total");
    });
  } else {
    let message = document.createElement("div");
    cart.insertBefore(message, buttons);
    message.innerHTML =
      "<div>Tu carrito esta vacio.</div><a href='/products/shop'>Hace click aca para ver los productos que tenemos disponibles!<a/>";
    message.classList.add("cart__message");
    message.setAttribute("id", "cart-empty");
  }

  if (document.getElementById("delete-button")) {
    let deleteButtons = document.querySelectorAll("#delete-button");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        productQuantity = button.parentElement;
        productRow = productQuantity.parentElement;
        productRow.remove();

        const id = productRow.getAttribute("id");
        let products = JSON.parse(localStorage.getItem("products"));
        products = products.filter((product) => product.id != id);

        if (products.length > 0) {
          localStorage.setItem("products", JSON.stringify(products));
        } else {
          localStorage.clear();

          let message = document.createElement("div");
          cart.insertBefore(message, buttons);
          message.innerHTML =
            "<div>Tu carrito esta vacio.</div><a href='/products/shop'>Hace click aca para ver los productos que tenemos disponibles!<a/>";
          message.classList.add("cart__message");
          message.setAttribute("id", "cart-empty");
        }
      });
    });
  }
});
