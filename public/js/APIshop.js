window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".btn--plant");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const id = button.parentElement.getAttribute("data-id");

      if (localStorage.getItem("products")) {
        let products = JSON.parse(localStorage.getItem("products"));
        let productFound = false;

        products.forEach((product) => {
          if (product.id === id) {
            product.quantity++;
            productFound = true;
          }
        });

        if (productFound) {
          localStorage.setItem("products", JSON.stringify(products));

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
                quantity: 1,
              },
            ])
          );

          button.innerText = "Añadido";
          setTimeout(() => {
            button.innerText = "Agregar Al Carrito";
          }, 1500);
        }
      } else {
        let products = [{ id: id, quantity: 1 }];

        localStorage.setItem("products", JSON.stringify(products));

        button.innerText = "Añadido";
        setTimeout(() => {
          button.innerText = "Agregar Al Carrito";
        }, 1500);
      }
    });
  });
});
