window.addEventListener("load", () => {
  // Shop
  const button = document.querySelector(".user-menu__button");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/products/shop";
  });
});
