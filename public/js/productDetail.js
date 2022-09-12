window.addEventListener("load", () => {
  // Calification

  const label = document.querySelector(".product-detail__calification-label");
  const line = document.querySelector(".product-detail__calification-line");

  setTimeout(() => {
    if (label.innerText == "BÁSICO") {
      line.style.width = "25%";
    } else if (label.innerText == "INTERMEDIO") {
      line.style.width = "50%";
    } else if (label.innerText == "EXPERTO") {
      line.style.width = "99.2%";
    }
  }, 100);

  // Size

  const sizeTitle = document.querySelector(".product-detail__size-title");
  const small = document.getElementById("small");
  const medium = document.getElementById("medium");
  const large = document.getElementById("large");
  const extraLarge = document.getElementById("extra-large");

  const sizeArray = [small, medium, large, extraLarge];

  sizeArray.forEach((size) => {
    size.addEventListener("click", (event) => {
      event.preventDefault();
      sizeTitle.innerHTML =
        "<strong>Size:</strong> <i>" + size.innerText + "</i>";
    });
  });

  // Color

  const colorTitle = document.querySelector(".product-detail__color-title");
  const brown = document.getElementById("brown");
  const orange = document.getElementById("orange");
  const white = document.getElementById("white");

  const colorArray = [brown, orange, white];

  colorArray.forEach((color) => {
    color.addEventListener("click", (event) => {
      event.preventDefault();
      colorTitle.innerHTML =
        "<strong>Color:</strong> <i>" + color.value + "</i>";
    });
  });

  // Cart

  const id = document
    .querySelector(".product-detail__section")
    .getAttribute("data-id");
  const image =
    "http://localhost:3000" +
    document.querySelector(".product-detail__picture").getAttribute("src");
  const name = document.querySelector(".product-detail__name").innerText;
  const price = document.querySelector(
    ".product-detail__price--original"
  ).innerText;
  const button = document.querySelector(".product-detail__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    let products = JSON.parse(localStorage.getItem("products"));
    let productFound = false;

    const quantity = parseInt(
      document.querySelector(".product-detail__number-display").innerText
    );

    if (products) {
      products.forEach((product) => {
        if (product.id == id) {
          product.quantity += quantity;
          productFound = true;
        }
      });

      if (productFound) {
        localStorage.setItem("products", JSON.stringify(products));
        let productFound = false;

        button.innerText = "Añadido";
        setTimeout(() => {
          button.innerText = "Agregar Al Carrito";
        }, 1500);
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify([
            ...products,
            {
              id: id,
              name: name,
              price: price,
              quantity: quantity,
              image: image,
            },
          ])
        );

        button.innerText = "Añadido";
        setTimeout(() => {
          button.innerText = "Agregar Al Carrito";
        }, 1500);
      }
    } else {
      let products = [
        { id: id, name: name, price: price, image: image, quantity: quantity },
      ];

      localStorage.setItem("products", JSON.stringify(products));

      button.innerText = "Añadido";
      setTimeout(() => {
        button.innerText = "Agregar Al Carrito";
      }, 1500);
    }
  });

  // Quantity

  const less = document.querySelector(".product-detail__less-button");
  const plus = document.querySelector(".product-detail__plus-button");
  const number = document.querySelector(".product-detail__number-display");

  less.addEventListener("click", (event) => {
    event.preventDefault();
    if (number.innerText > 1) {
      number.innerText--;
    }
  });

  plus.addEventListener("click", (event) => {
    event.preventDefault();
    if (number.innerText <= 100) {
      number.innerText++;
    }
  });
});
