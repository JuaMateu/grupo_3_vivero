window.addEventListener("load", () => {
  let products = JSON.parse(localStorage.getItem("products"));
  console.log(products);

  // Price

  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += parseInt(product.price.substring(1, product.price.length));
  });

  let finalPrice = document.querySelector(".cart__totalPrice");
  finalPrice.innerText = "$" + totalPrice;

  // Product

  let cart = document.querySelector(".cart");
  let buttons = document.querySelector(".cart__buttons");

  products.forEach((product) => {
    let myProduct = document.createElement("div");
    cart.insertBefore(myProduct, buttons);
    myProduct.classList.add("cart__product");

    let placeholder = document.createElement("div");
    myProduct.appendChild(placeholder);
    placeholder.classList.add("cart__productImageContainer");

    let image = document.createElement("img");
    placeholder.appendChild(image);
    image.classList.add("cart__productImage");
    image.setAttribute("src", product.image.substring(22));
    image.setAttribute("alt", "Product Image");

    let description = document.createElement("div");
    myProduct.appendChild(description);
    description.classList.add("cart__productDescription");

    let name = document.createElement("div");
    description.appendChild(name);
    name.innerText = product.name;
    name.classList.add("cart__productName");

    let price = document.createElement("div");
    description.appendChild(price);
    price.classList.add("cart__productPrice");

    let detail = document.createElement("div");
    price.appendChild(detail);
    detail.innerText = product.price;
  });
});
