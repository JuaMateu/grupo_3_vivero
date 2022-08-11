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

    if (!firstName.value || firstName.value.length >= 2) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-danger");
      paragraph.innerText =
        "El campo de nombre debe contener al menos 2 caracteres.";
      div1.appendChild(paragraph);
    }

    // Last Name

    if (!lastName.value || lastName.value.length >= 2) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-danger");
      paragraph.innerText =
        "El campo de apellido debe contener al menos 2 caracteres.";
      div2.appendChild(paragraph);
    }

    // Email

    if (
      !email.value ||
      email.value.includes("@") ||
      email.value.includes(".com")
    ) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-danger");
      paragraph.innerText = "El campo de email debe ser válido.";
      div3.appendChild(paragraph);
    }

    // Password

    if (!password.value || password.value.length >= 8) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-danger");
      paragraph.innerText =
        "El campo de contraseña debe contener al menos 8 caracteres.";
      div4.appendChild(paragraph);
    }

    // Password Check

    if (!passwordCheck.value || passwordCheck.value === password.value) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-danger");
      paragraph.innerText = "Ambas campos de contraseña deben coincidir.";
      div5.appendChild(paragraph);
    }
  });
});
