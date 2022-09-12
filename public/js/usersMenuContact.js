window.addEventListener("load", () => {
  // Left Column

  const list = document.querySelector(".user-menu__information-list");
  list.classList.add("user-menu__information-list-toggle");

  const userContact = document.querySelector(".user-menu__contact");
  userContact.classList.toggle("user-menu__contact-toggle");

  // Form

  const form = document.querySelector("#users-form");

  const street = document.querySelector("#street");
  const number = document.querySelector("#number");
  const state = document.querySelector("#state");
  const city = document.querySelector("#city");
  const postalCode = document.querySelector("#postal-code");
  const mobile = document.querySelector("#mobile");
  const divMobile = document.querySelector("#div_mobile");
  const divPostal = document.querySelector("#div_postal");
  const divCity = document.querySelector("#div_city");
  const divState = document.querySelector("#div_state");
  const divNumber = document.querySelector("#div_number");
  const divStreet = document.querySelector("#div_street");

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
        divStreet.classList.add("inputFailure");
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
      divStreet.classList.remove("inputFailure");
      divStreet.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    // Number

    if (!document.getElementById("number-error")) {
      if (!number.value) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "number-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        divNumber.classList.add("inputFailure");
        paragraph.innerText =
          "El campo de número debe contener al menos 1 carácter.";
        number.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("number-error") &&
      number.value.length >= 1
    ) {
      const paragraph = document.getElementById("number-error");
      paragraph.remove();
      divNumber.classList.remove("inputFailure");
      divNumber.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    // State

    if (!document.getElementById("state-error")) {
      if (!state.value || state.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "state-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        divState.classList.add("inputFailure");
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
      divState.classList.remove("inputFailure");
      divState.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    // City

    if (!document.getElementById("city-error")) {
      if (!city.value || city.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "city-error");
        paragraph.classList.add("text-danger");
        divCity.classList.add("inputFailure");
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
      divCity.classList.remove("inputFailure");
      divCity.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    // Postal Code

    if (!document.getElementById("postal-code-error")) {
      if (!postalCode.value) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "postal-code-error");
        paragraph.classList.add("text-danger");
        paragraph.style.maxWidth = "300px";
        divPostal.classList.add("inputFailure");
        paragraph.innerText =
          "El campo de código postal debe contener al menos 1 carácter.";
        postalCode.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("postal-code-error") &&
      postalCode.value.length >= 1
    ) {
      const paragraph = document.getElementById("postal-code-error");
      paragraph.remove();
      divPostal.classList.remove("inputFailure");
      divPostal.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    // Mobile

    if (!document.getElementById("mobile-error")) {
      if (!mobile.value && mobile.value.length != 10) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "mobile-error");
        paragraph.classList.add("text-danger");
        divMobile.classList.add("inputFailure");
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
      divMobile.classList.remove("inputFailure");
      divMobile.classList.add("inputSuccess");
      errorCounter -= 1;
    }

    if (errorCounter === 0) {
      form.submit();
    }
  });
});
