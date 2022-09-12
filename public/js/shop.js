window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".btn--plant");
  const pageLinks = document.querySelectorAll(".shop-pages__link");
  const cardWrapper = document.getElementById("cardWrapper");
  const orderBy = document.querySelector(".order-by__form");
  let OrderByValue = document.querySelector("#orderBy");
  let careLvl = document.getElementById("careLvl");
  let carelvlTitle = document.getElementById("carelvlTitle");
  let params = new URLSearchParams(window.location.search);




  //ordena el listado preservando query string actuales
  orderBy.addEventListener("change", (e) => {
    let value = OrderByValue.value;

    params.set("orderBy", value);
    let queryStrings = params.toString();

    // let searchedValue = (params.get('searched'))
    window.location.href = `http://localhost:3000/products/shop?${queryStrings}`;
    // if(params.has('searched')) {
    //   window.location.href = `http://localhost:3000/products/shop?orderBy=${value}&searched=${searchedValue}`
    // } else {
    //   window.location.href = `http://localhost:3000/products/shop?orderBy=${value}`
    // }
  });

  pageLinks.forEach((link) => {
    let value = link.innerText;

    if (params.has("page")) {
      value == params.get("page")
        ? link.classList.add("shop-pages__link--active")
        : "";
    } else {
      value == 1 ? link.classList.add("shop-pages__link--active") : "";
    }

    link.addEventListener("click", (event) => {
      value = link.innerText;

      params.set("page", value);
      let queryStrings = params.toString();
      window.location.href = `http://localhost:3000/products/shop?${queryStrings}`;
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const previousSibling =
        button.previousElementSibling.previousElementSibling;
      const children = previousSibling.children;
      const id = button.parentElement.getAttribute("data-id");
      const name = children[1].innerText;
      const price = children[2].innerText;
      const package = children[0];
      const image = package.children[0].src;

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
          { id: id, name: name, price: price, image: image, quantity: 1 },
        ];

        localStorage.setItem("products", JSON.stringify(products));

        button.innerText = "Añadido";
        setTimeout(() => {
          button.innerText = "Agregar Al Carrito";
        }, 1500);
      }
    });
  });
});
