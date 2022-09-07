window.addEventListener("load", () => {
  let cart = document.querySelector(".cart");
  let buttons = document.querySelector(".cart__buttons");

  // Price

  let totalPrice = 0;

  // Product

  let products = JSON.parse(localStorage.getItem("products"));

  if (products && products.length > 0) {
    products.forEach((item) => {
      fetch(`/api/products/${item.id}`)
        .then((response) => response.json())
        .then((product) => {
          let productPrice =
            product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            ".00";

          let myProduct = document.createElement("article");
          cart.insertBefore(myProduct, buttons);
          myProduct.setAttribute("data-id", product.id);
          myProduct.classList.add("cart__product");

          let myDetail = document.createElement("div");
          myProduct.appendChild(myDetail);
          myDetail.classList.add("cart__product-detail");

          let myPlaceholder = document.createElement("div");
          myDetail.appendChild(myPlaceholder);
          myPlaceholder.classList.add("cart__product-image");

          let myImage = document.createElement("img");
          myPlaceholder.appendChild(myImage);
          myImage.setAttribute("src", product.img);
          myImage.setAttribute("alt", "Imagen Del Producto");

          let myPrice = document.createElement("div");
          myProduct.appendChild(myPrice);
          myPrice.innerText = productPrice;
          myPrice.classList.add("cart__product-price");

          let myQuantity = document.createElement("div");
          myProduct.appendChild(myQuantity);
          myQuantity.classList.add("cart__product-quantity");

          let myInput = document.createElement("input");
          myQuantity.appendChild(myInput);
          myInput.setAttribute("type", "number");
          myInput.setAttribute("value", item.quantity);
          myInput.setAttribute("min", "1");
          myInput.setAttribute("max", "100");

          let deleteButton = document.createElement("a");
          myQuantity.appendChild(deleteButton);
          deleteButton.setAttribute("id", "delete-button");
          deleteButton.setAttribute("href", "");
          deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            myProductQuantity = deleteButton.parentElement;
            myProductRow = myProductQuantity.parentElement;
            myProductRow.remove();

            let products = JSON.parse(localStorage.getItem("products"));
            products = products.filter((index) => index.id != product.id);

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

          let icon = document.createElement("i");
          deleteButton.appendChild(icon);
          icon.classList.add("icon");
          icon.classList.add("cart__icon");
          icon.setAttribute("id", "trash");

          let total = document.createElement("div");
          myProduct.appendChild(total);
          total.innerText =
            "$" +
            (product.price * item.quantity)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            ".00";
          total.classList.add("cart__product-total");
        });
    });
  } else {
    let message = document.createElement("div");
    cart.insertBefore(message, buttons);
    message.innerHTML =
      "<div>Tu carrito esta vacio.</div><a href='/products/shop'>Hace click aca para ver los productos que tenemos disponibles!<a/>";
    message.classList.add("cart__message");
    message.setAttribute("id", "cart-empty");
  }

  // Purchase

  let form = document.getElementById("cart-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(products);
    console.log(totalPrice);
    const data = {
      orderToProduct: products,
      paymentMethod: form.paymentMethod.value,
      // Total
    };
    fetch("api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json().then((response) => {}));
  });
});
