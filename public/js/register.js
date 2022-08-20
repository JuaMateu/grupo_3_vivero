window.addEventListener("load", () => {
  const form = document.querySelector("#users-form");

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordCheck = document.querySelector("#passwordCheck");

  const div1 = document.querySelector("#div-1");
  const div2 = document.querySelector("#div-2");
  const div3 = document.querySelector("#div-3");
  const div4 = document.querySelector("#div-4");
  const div5 = document.querySelector("#div-5");

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
        div1.appendChild(paragraph);
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
        div2.appendChild(paragraph);
      }
    } else if (
      document.getElementById("last-name-error") &&
      lastName.value.length >= 2
    ) {
      const paragraph = document.getElementById("last-name-error");
      paragraph.remove();
    }

    // Email

    if (!document.getElementById("email-error")) {
      if (
        !email.value ||
        !email.value.includes("@") ||
        !email.value.includes(".com")
      ) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "email-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText = "El campo de email debe ser válido.";
        div3.appendChild(paragraph);
      }
    } else if (
      document.getElementById("email-error") &&
      email.value.includes("@") &&
      email.value.includes(".com")
    ) {
      const paragraph = document.getElementById("email-error");
      paragraph.remove();
    }

    // Password

    if (!document.getElementById("password-error")) {
      if (!password.value || password.value.length < 8) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "password-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "El campo de contraseña debe contener al menos 8 caracteres.";
        div4.appendChild(paragraph);
      }
    } else if (
      document.getElementById("password-error") &&
      password.value.length >= 8
    ) {
      const paragraph = document.getElementById("password-error");
      paragraph.remove();
    }

    // Password Check

    if (!document.getElementById("password-check-error")) {
      if (!passwordCheck.value || passwordCheck.value !== password.value) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "password-check-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText = "Ambas campos de contraseña deben coincidir.";
        div5.appendChild(paragraph);
      }
    } else if (
      document.getElementById("password-check-error") &&
      passwordCheck.value === password.value
    ) {
      const paragraph = document.getElementById("password-check-error");
      paragraph.remove();
    }
  });
});
