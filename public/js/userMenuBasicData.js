window.addEventListener("load", () => {
  const form = document.querySelector("#users-form");

  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const birthday = document.querySelector("#date_of_birth");
  console.log(birthday.value.toString().substring(0, 4));

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
      }
    } else if (
      document.getElementById("first-name-error") &&
      firstName.value.length >= 2
    ) {
      const paragraph = document.getElementById("first-name-error");
      paragraph.remove();
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
      }
    } else if (
      document.getElementById("last-name-error") &&
      lastName.value.length >= 2
    ) {
      const paragraph = document.getElementById("last-name-error");
      paragraph.remove();
    }

    // Birthday

    if (!document.getElementById("birthday-error")) {
      if (!birthday.value.length != 10 && birthday.value.toString().substring(0, 4) ) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "birthday-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "El campo de fecha de nacimiento debe ser válido.";
        birthday.insertAdjacentElement("afterend", paragraph);
      }
    } else if (
      document.getElementById("birthday-error") &&
      birthday.value.length >= 2
    ) {
      const paragraph = document.getElementById("birthday-error");
      paragraph.remove();
    }
  });
});
