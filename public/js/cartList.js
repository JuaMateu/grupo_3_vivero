window.addEventListener("load", () => {
  let products = JSON.parse(localStorage.getItem("products"));
  const cart = document.querySelector(".cart");
  const form = document.querySelector(".cart__form");
  const totalPlaceholder = document.querySelector(".cart__total-placeholder");

  // Price

  let totalPrice = 0;

  if (products && products.length > 0) {
    products.forEach((product) => {
      totalPrice +=
        Number(
          product.price
            .substring(1, product.price.length)
            .replace(",", "")
            .replace(".00", "")
        ) * Number(product.quantity);
    });
  }

  totalLabel = document.createElement("div");
  totalPlaceholder.appendChild(totalLabel);
  totalLabel.innerText = "Total";
  totalLabel.classList.add("cart__total-label");

  const totalNumber = document.createElement("div");
  totalPlaceholder.appendChild(totalNumber);
  totalNumber.setAttribute("id", "total-price");
  totalNumber.classList.add("cart__total-number");
  totalNumber.innerText = `$${
    totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"
  }`;

  // Product

  if (products && products.length > 0) {
    products.forEach((product) => {
      let myPrice = parseInt(
        product.price.substring(1, product.price.length).replace(",", "")
      );

      const myProduct = document.createElement("div");
      cart.insertBefore(myProduct, form);
      myProduct.setAttribute("data-id", product.id);
      myProduct.classList.add("cart__product");

      const detail = document.createElement("div");
      myProduct.appendChild(detail);
      detail.classList.add("cart__product-detail");

      const placeholder = document.createElement("div");
      detail.appendChild(placeholder);
      placeholder.classList.add("cart__product-image");

      const image = document.createElement("img");
      placeholder.appendChild(image);
      image.setAttribute("src", product.image.substring(22));
      image.setAttribute("alt", "Imagen Del Producto");

      const name = document.createElement("div");
      detail.append(name);
      name.innerText = product.name;

      const price = document.createElement("div");
      myProduct.appendChild(price);
      price.innerText = product.price;
      price.classList.add("cart__product-price");

      const quantity = document.createElement("div");
      myProduct.appendChild(quantity);
      quantity.classList.add("cart__product-quantity");

      const minus = document.createElement("i");
      quantity.appendChild(minus);
      minus.classList.add("fa-solid");
      minus.classList.add("fa-minus");
      minus.classList.add("minus-icon");
      minus.setAttribute("id", "minus");

      const number = document.createElement("div");
      quantity.appendChild(number);
      number.innerText = product.quantity;
      number.classList.add("cart__product-number");
      number.setAttribute("id", "number");

      const plus = document.createElement("i");
      quantity.appendChild(plus);
      plus.classList.add("fa-solid");
      plus.classList.add("fa-plus");
      plus.classList.add("plus-icon");
      plus.setAttribute("id", "plus");

      const total = document.createElement("div");
      myProduct.appendChild(total);
      total.innerText =
        "$" +
        (myPrice * product.quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        ".00";
      total.classList.add("cart__product-total");

      const deleteButton = document.createElement("a");
      myProduct.appendChild(deleteButton);
      deleteButton.setAttribute("id", "delete-button");
      deleteButton.setAttribute("href", "");

      const trash = document.createElement("i");
      deleteButton.appendChild(trash);
      trash.classList.add("fa-solid");
      trash.classList.add("fa-trash");
      trash.classList.add("trash-icon");
    });
  } else {
    const message = document.createElement("div");
    cart.insertBefore(message, form);
    message.innerHTML =
      "<div>Tu carrito esta vacio.</div><a href='/products/shop'>¡Hace click acá para ver los productos que tenemos disponibles!<a/>";
    message.classList.add("cart__message");
    message.setAttribute("id", "cart-empty");
  }

  // Plus Icon

  if (document.getElementById("plus")) {
    const plusButtons = document.querySelectorAll("#plus");

    plusButtons.forEach((plusButton) => {
      plusButton.addEventListener("click", (event) => {
        event.preventDefault();

        const number = plusButton.previousSibling;
        if (Number(number.innerText) <= 100) {
          number.innerText = Number(number.innerText) + 1;

          const quantity = plusButton.parentElement;
          const price = quantity.previousSibling;
          const total = quantity.nextSibling;
          const trash = total.nextSibling;
          let subtotal =
            Number(
              price.innerText
                .substring(1, price.length)
                .replace(",", "")
                .replace(".00", "")
            ) * number.innerText;
          total.innerText =
            subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";

          // Local Storage

          const myProductRow = quantity.parentElement;
          const id = myProductRow.getAttribute("data-id");

          let products = JSON.parse(localStorage.getItem("products"));

          products.forEach((product) => {
            if (product.id == id) {
              product.quantity++;
            }
          });

          if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
          }

          // Price

          totalPrice = 0;
          products.forEach((product) => {
            totalPrice +=
              Number(
                product.price
                  .substring(1, product.price.length)
                  .replace(",", "")
                  .replace(".00", "")
              ) * Number(product.quantity);
          });

          totalNumber.innerText = `$${
            totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"
          }`;
        }
      });
    });
  }

  // Minus Icon

  if (document.getElementById("minus")) {
    const minusButtons = document.querySelectorAll("#minus");

    minusButtons.forEach((minusButton) => {
      minusButton.addEventListener("click", (event) => {
        event.preventDefault();

        const number = minusButton.nextSibling;
        if (Number(number.innerText) > 1) {
          number.innerText = Number(number.innerText) - 1;

          const quantity = minusButton.parentElement;
          const price = quantity.previousSibling;
          const total = quantity.nextSibling;
          const trash = total.nextSibling;
          let subtotal =
            Number(
              price.innerText
                .substring(1, price.length)
                .replace(",", "")
                .replace(".00", "")
            ) * number.innerText;
          total.innerText =
            subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";

          // Local Storage

          const myProductRow = quantity.parentElement;
          const id = myProductRow.getAttribute("data-id");

          let products = JSON.parse(localStorage.getItem("products"));

          products.forEach((product) => {
            if (product.id == id) {
              product.quantity--;
            }
          });

          if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
          }

          // Price

          totalPrice = 0;
          products.forEach((product) => {
            totalPrice +=
              Number(
                product.price
                  .substring(1, product.price.length)
                  .replace(",", "")
                  .replace(".00", "")
              ) * Number(product.quantity);
          });

          totalNumber.innerText = `$${
            totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"
          }`;
        }
      });
    });
  }

  // Trash Icon

  if (document.getElementById("delete-button")) {
    let deleteButtons = document.querySelectorAll("#delete-button");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const myProductRow = deleteButton.parentElement;
        myProductRow.remove();

        const id = myProductRow.getAttribute("data-id");
        let products = JSON.parse(localStorage.getItem("products"));
        products = products.filter((product) => product.id != id);

        totalPrice = 0;
        products.forEach((product) => {
          totalPrice +=
            Number(
              product.price
                .substring(1, product.price.length)
                .replace(",", "")
                .replace(".00", "")
            ) * Number(product.quantity);
        });

        totalNumber.innerText = `$${
          totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"
        }`;

        if (products.length > 0) {
          localStorage.setItem("products", JSON.stringify(products));
        } else {
          localStorage.clear();

          let message = document.createElement("div");
          cart.insertBefore(message, form);
          message.innerHTML =
            "<div>Tu carrito esta vacio.</div><a href='/products/shop'>¡Hace click acá para ver los productos que tenemos disponibles!<a/>";
          message.classList.add("cart__message");
          message.setAttribute("id", "cart-empty");
        }
      });
    });
  }

  const returnButton = document.querySelector(".cart__return-button");
  returnButton.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/";
  });
});
