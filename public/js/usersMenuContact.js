window.addEventListener("load", () => {
  const form = document.querySelector("#users-form");

  const street = document.querySelector("#street");
  const number = document.querySelector("#number");
  const state = document.querySelector("#state");
  const city = document.querySelector("#city");
  const postalCode = document.querySelector("#postal-code");
  const mobile = document.querySelector("#mobile");

  let errorCounter = 0;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Street

    if (!document.getElementById("street-error")) {
      if (!street.value || street.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "street-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de calle debe contener al menos 2 caracteres.";
        street.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("street-error") &&
      street.value.length >= 2
    ) {
      const paragraph = document.getElementById("street-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // Number

    if (!document.getElementById("number-error")) {
      if (!number.value) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "number-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de número debe contener al menos 1 carácter.";
        number.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (document.getElementById("number-error")) {
      const paragraph = document.getElementById("number-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // State

    if (!document.getElementById("state-error")) {
      if (!state.value || state.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "state-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de provincia debe contener al menos 2 caracteres.";
        state.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("state-error") &&
      state.value.length >= 2
    ) {
      const paragraph = document.getElementById("state-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // City

    if (!document.getElementById("city-error")) {
      if (!city.value || city.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "city-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de provincia debe contener al menos 2 caracteres.";
        city.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("city-error") &&
      city.value.length >= 2
    ) {
      const paragraph = document.getElementById("city-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // Postal Code

    if (!document.getElementById("postal-code-error")) {
      if (!postalCode.value) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "postal-code-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de código postal debe contener al menos 1 carácter.";
        postalCode.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (document.getElementById("postal-code-error")) {
      const paragraph = document.getElementById("postal-code-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // Mobile

    if (!document.getElementById("mobile-error")) {
      if (!mobile.value && mobile.value.length != 10) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "mobile-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        paragraph.innerText =
          "El campo de telefono debe contener exactamente 10 caracteres.";
        mobile.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("mobile-error") &&
      mobile.value.length == 10
    ) {
      const paragraph = document.getElementById("mobile-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    if (errorCounter === 0) {
      form.submit();
    }
  });
});
