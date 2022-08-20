window.addEventListener("load", () => {
  // localStorage.clear();

  let buttons = document.querySelectorAll(".btn--plant");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      let previousSibling = button.previousElementSibling;
      let children = previousSibling.children;
      let name = children[1].innerText;
      let price = children[2].innerText;
      let package = children[0];
      let image = package.children[0].src;

      if (localStorage.getItem("products")) {
        let products = JSON.parse(localStorage.getItem("products"));

        localStorage.setItem(
          "products",
          JSON.stringify([
            ...products,
            { name: name, price: price, image: image },
          ])
        );
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify([{ name: name, price: price, image: image }])
        );
      }
    });
  });
});
