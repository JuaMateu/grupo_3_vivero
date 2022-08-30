window.addEventListener("load", () => {
  // localStorage.clear();

  const body = document.querySelector("body");
  const buttons = document.querySelectorAll(".btn--plant");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const previousSibling = button.previousElementSibling;
      const children = previousSibling.children;
      const name = children[1].innerText;
      const price = children[2].innerText;
      const package = children[0];
      const image = package.children[0].src;

      if (localStorage.getItem("products")) {
        let products = JSON.parse(localStorage.getItem("products"));
        let productFound = false;

        products.forEach((product) => {
          if (product.name === name) {
            product.quantity++;
            productFound = true;
          }
        });

        if (productFound) {
          localStorage.setItem("products", JSON.stringify(products));

          const messageBox = document.createElement("div");
          messageBox.innerText = `${name} se ha agregado al carrito exitosamente!`;
          messageBox.classList.add("cart__message-box");
          body.appendChild(messageBox);
          setTimeout(() => {
            messageBox.remove();
          }, 5000);

          button.innerText = "Añadido";
          setTimeout(() => {
            button.innerText = "Agregar Al Carrito";
          }, 1000);
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

          const messageBox = document.createElement("div");
          messageBox.innerText = `${name} se ha agregado al carrito exitosamente!`;
          messageBox.classList.add("cart__message-box");
          body.appendChild(messageBox);
          setTimeout(() => {
            messageBox.remove();
          }, 5000);

          button.innerText = "Añadido";
          setTimeout(() => {
            button.innerText = "Agregar Al Carrito";
          }, 1000);
        }
      } else {
        let products = [
          { id: 1, name: name, price: price, image: image, quantity: 1 },
        ];

        localStorage.setItem("products", JSON.stringify(products));

        const messageBox = document.createElement("div");
        messageBox.innerText = `${name} se ha agregado al carrito exitosamente!`;
        messageBox.classList.add("cart__message-box");
        body.appendChild(messageBox);
        setTimeout(() => {
          messageBox.remove();
        }, 5000);

        button.innerText = "Añadido";
        setTimeout(() => {
          button.innerText = "Agregar Al Carrito";
        }, 1000);
      }
    });
  });
});
