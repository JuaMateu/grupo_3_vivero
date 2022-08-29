window.addEventListener("load", () => {
  setInterval(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    let productsTotal = 0;

    const numberOfProducts = document.querySelector(".cart__counter");

    if (products) {
      products.forEach((product) => {
        productsTotal = productsTotal + product.quantity;
      });

      numberOfProducts.innerText = "(" + productsTotal + ")";
    } else {
      numberOfProducts.innerText = "(0)";
    }
  }, 100);
});
