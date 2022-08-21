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

        localStorage.setItem(
          "products",
          JSON.stringify([
            ...products,
            { name: name, price: price, image: image },
          ])
        );

        const messageBox = document.createElement("div");
        messageBox.innerText = `${name} se ha agregado al carrito exitosamente!`;
        messageBox.classList.add("cart__message-box");
        body.appendChild(messageBox);
        setTimeout(() => {
          messageBox.remove();
        }, 5000);
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify([{ name: name, price: price, image: image }])
        );

        const messageBox = document.createElement("div");
        messageBox.innerText = `${name} se ha agregado al carrito exitosamente!`;
        messageBox.classList.add("cart__message-box");
        body.appendChild(messageBox);
        setTimeout(() => {
          messageBox.remove();
        }, 5000);
      }
    });
  });
});
