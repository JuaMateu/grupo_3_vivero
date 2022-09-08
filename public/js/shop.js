window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".btn--plant");
  const SearchInput = document.querySelector('.search-bar')
  const orderBy = document.querySelector('.order-by__form')
  let OrderByValue = document.querySelector('#orderBy')
  let careLvl = document.getElementById('careLvl')
  let carelvlTitle = document.getElementById('carelvlTitle')

  careLvl.style.maxHeight = 0;
  careLvl.style.overflow = 'hidden';

  carelvlTitle.addEventListener('click', (e) =>{
    careLvl.style.overflow = 'hidden';
    if (!careLvl.style.maxHeight || careLvl.style.maxHeight === "0px" ) {
      careLvl.style.maxHeight = '500px';
    } else {
      careLvl.style.maxHeight = "0px";
    }
  })



  orderBy.addEventListener("change", (e) =>{
    let value = OrderByValue.value

    let params = new URLSearchParams(window.location.search)
    let searchedValue = (params.get('searched'))

    if(params.has('searched')) {
      window.location.href = `http://localhost:3000/products/shop?orderBy=${value}&searched=${searchedValue}`
    } else {
      window.location.href = `http://localhost:3000/products/shop?orderBy=${value}`
    }

  })

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
