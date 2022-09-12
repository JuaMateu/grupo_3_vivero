window.addEventListener("load", () => {
  const navItems = document.querySelectorAll(".section-menu__list li");
  const url = window.location.href;
  const originPath = window.location.origin + window.location.pathname
  
  navItems.forEach((element) => {
    let link = element.querySelector(".nav-item").href;
    if (link == url ) {
      element.classList.add("section-menu__list--active");
    }
  });

  // Cart

  setInterval(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    let productsTotal = 0;

    const numberOfProducts = document.querySelector(".cart__counter");

    if (products) {
      products.forEach((product) => {
        productsTotal = productsTotal + product.quantity;
      });

      numberOfProducts.innerText = productsTotal;
      numberOfProducts.style.display = "block";
    } else {
      numberOfProducts.style.display = "none";
    }
  }, 100);
});
