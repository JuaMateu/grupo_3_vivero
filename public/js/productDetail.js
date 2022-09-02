window.addEventListener("load", () => {
  // Calification

  const label = document.querySelector(".product-detail__calification-label");
  const line = document.querySelector(".product-detail__calification-line");

  if (label.innerText == "MUY MALA") {
    line.style.width = "10%";
  } else if (label.innerText == "MALA") {
    line.style.width = "30%";
  } else if (label.innerText == "NORMAL") {
    line.style.width = "50%";
  } else if (label.innerText == "BUENA") {
    line.style.width = "70%";
  } else if (label.innerText == "MUY BUENA") {
    line.style.width = "90%";
  } else if (label.innerText == "EXCELENTE") {
    line.style.width = "100%";
  }

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
      sizeTitle.innerHTML = "<strong>Size:</strong> <i>" + size.value + "</i>";
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

    if (products) {
      products.forEach((product) => {
        if (product.name == name) {
          product.quantity++;
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
              id: products[products.length - 1].id + 1,
              name: name,
              price: price,
              quantity: 1,
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
        { id: 1, name: name, price: price, image: image, quantity: 1 },
      ];

      localStorage.setItem("products", JSON.stringify(products));

      button.innerText = "Añadido";
      setTimeout(() => {
        button.innerText = "Agregar Al Carrito";
      }, 1500);
    }
  });
});
