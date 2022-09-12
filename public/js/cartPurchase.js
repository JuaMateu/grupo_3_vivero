window.addEventListener("load", () => {
  const id = document.querySelector(".cart").getAttribute("data-user");

  const form = document.getElementById("cart-form");
  let totalPrice = document.getElementById("total-price").innerText;
  totalPrice = Number(
    totalPrice
      .substring(1, totalPrice.length)
      .replace(",", "")
      .replace(".00", "")
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Products

    let productsCompleted = JSON.parse(localStorage.getItem("products"));

    let productsFiltered = [];
    productsCompleted.forEach((product) => {
      productsFiltered.push({
        id: product.id,
        quantity: product.quantity,
      });
    });

    const data = {
      orderToProduct: productsFiltered,
      payment_method_id: form.payment - method.value,
      user_id: id,
      total: totalPrice,
    };

    fetch("/api/products/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response.json().then((response) => {
        localStorage.removeItem("products");
        location.href = "/";
      })
    );
  });
});
