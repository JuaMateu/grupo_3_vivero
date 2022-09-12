window.addEventListener("load", () => {
  // Left Column

  const list = document.querySelector(".user-menu__information-list");
  list.classList.add("user-menu__information-list-toggle");

  const userContact = document.querySelector(".user-menu__contact");
  userContact.classList.toggle("user-menu__contact-toggle");

  // Form

  const form = document.querySelector("#users-form");

  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const birthday = document.querySelector("#date_of_birth");

  let errorCounter = 0;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // First Name

    if (!document.getElementById("first-name-error")) {
      if (!firstName.value || firstName.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "first-name-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "El campo de nombre debe contener al menos 2 caracteres.";
        firstName.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("first-name-error") &&
      firstName.value.length >= 2
    ) {
      const paragraph = document.getElementById("first-name-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // Last Name

    if (!document.getElementById("last-name-error")) {
      if (!lastName.value || lastName.value.length < 2) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "last-name-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "El campo de apellido debe contener al menos 2 caracteres.";
        lastName.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("last-name-error") &&
      lastName.value.length >= 2
    ) {
      const paragraph = document.getElementById("last-name-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    if (errorCounter === 0) {
      form.submit();
    }
  });
});
