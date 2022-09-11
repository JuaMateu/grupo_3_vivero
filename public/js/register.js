window.addEventListener("load", () => {
  // == Selectores DOM ==
  const form = document.querySelector("#users-form");

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordCheck = document.querySelector("#passwordCheck");

  // contenedores de cada input, se usan para clases de exito o error
  // TODO
  const divfirstName = document.querySelector("#div-1");
  const divLastName = document.querySelector("#div-2");
  const divEmail = document.querySelector("#div-3");
  const divPass = document.querySelector("#div-4");
  const divPassCheck = document.querySelector("#div-5");

  // RegExp para validar mail
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // ==== FUNCIONES ====

  // Recibe elemento DOM y un mensaje para mostrar en caso de error
  showMessage = (element, message) => {
    deleteErrorMsg(element.parentElement);
    inputFailure(element.parentElement);
    let paragraph = document.createElement("p");
    paragraph.classList.toggle("text-danger");
    paragraph.innerText = message;
    element.insertAdjacentElement("afterend", paragraph);
  };

  // Asigna clase de error a un input
  inputFailure = (element) => {
    element.classList.remove("inputSuccess");
    element.classList.add("inputFailure");
  };
  // Asigna clase de exito a un input
  inputSuccess = (element) => {
    element.classList.remove("inputFailure");
    element.classList.add("inputSuccess");
  };
  // Borra mensajes de error
  deleteErrorMsg = (element) => {
    element.querySelectorAll(".text-danger").forEach((e) => e.remove());
  };

  // Controla que la pasword sea segura y da feedback con cada keyup del usuario
  passwordStrengthChecker = (passInput) => {
    //
    let pass = passInput.value;
    // fuerza de la password
    let passwordStrength = 0;
    //mensajes de error
    let Weaknesses = [];
    //borra mensajes
    deleteErrorMsg(divPass);

    //condiciones, si se cumplen aumenta 1 la fz, si no agregan un mensaje de error al array
    pass.length >= 8
      ? passwordStrength++
      : Weaknesses.push("Debe contener como minimo 8 caracteres");
    /[a-z]/g.test(pass)
      ? passwordStrength++
      : Weaknesses.push("Debe contener una minúscula");
    /[A-Z]/g.test(pass)
      ? passwordStrength++
      : Weaknesses.push("Debe contener una mayúscula");
    /[\W]/g.test(pass)
      ? passwordStrength++
      : Weaknesses.push("Debe contener un símbolo");
    /[0-9]/g.test(pass)
      ? passwordStrength++
      : Weaknesses.push("Debe contener número");

    // Weaknesses.forEach(w => showMessage(password, w))
    if (Weaknesses.length < 5 && pass) {
      Weaknesses.forEach((w) => {
        let p = document.createElement("p");
        p.classList.toggle("text-danger");
        p.innerText = w;
        passInput.insertAdjacentElement("afterend", p);
      });
    }

    Weaknesses.length > 0 ? inputFailure(divPass) : "";
    return passwordStrength;
  };

  // === VALIDACIONES ON KEYUP PARA DAR FEEDBACK INSTANTANEO ===

  // First Name
  firstName.addEventListener("keyup", (event) => {
    deleteErrorMsg(divfirstName);
    if (!firstName.value || firstName.value.length < 3) {
      inputFailure(divfirstName);
      showMessage(
        firstName,
        "El campo de nombre debe contener al menos 3 caracteres."
      );
    } else {
      inputSuccess(divfirstName);
    }
  });

  // Last name
  lastName.addEventListener("keyup", (event) => {
    deleteErrorMsg(divLastName);
    if (!lastName.value || lastName.value.length < 3) {
      inputFailure(divLastName);
      showMessage(
        lastName,
        "El campo de apellido debe contener al menos 3 caracteres."
      );
    } else {
      inputSuccess(divLastName);
    }
  });

  // Email
  email.addEventListener("keyup", (event) => {
    deleteErrorMsg(divEmail);

    if (!email.value || !isEmail.test(email.value)) {
      showMessage(email, "El campo de email debe ser válido.");
      inputFailure(divEmail);
    } else {
      inputSuccess(divEmail);
    }
  });

  // Password
  password.addEventListener("keyup", (event) => {
    if (passwordStrengthChecker(password) < 5) {
      inputFailure(divPass);
    } else {
      inputSuccess(divPass);
    }
  });

  // Password check
  passwordCheck.addEventListener("keyup", (event) => {
    deleteErrorMsg(divPassCheck);
    if (!passwordCheck.value || passwordCheck.value !== password.value) {
      inputFailure(divPassCheck);
      showMessage(passwordCheck, "Ambas campos de contraseña deben coincidir.");
    } else {
      inputSuccess(divPassCheck);
    }
  });

  // fin validaciones onkeyup

  // === VALIDACIONES ON SUBMIT ===

  form.addEventListener("submit", (event) => {
    let errorCounter = 0;

    // First Name
    if (!firstName.value || firstName.value.length < 3) {
      showMessage(firstName, "El nombre debe contener al menos 3 caracteres.");
      errorCounter++;
    }

    // Last Name
    if (!lastName.value || lastName.value.length < 3) {
      showMessage(lastName, "El apellido debe contener al menos 3 caracteres.");
      errorCounter++;
    }

    // Email
    if (
      !email.value ||
      !email.value.includes("@") ||
      !email.value.includes(".com")
    ) {
      showMessage(email, "Debes ingresar una direccion válida");
      errorCounter++;
    }

    // Password
    if (passwordStrengthChecker(password) < 5) {
      showMessage(
        password,
        "La Contreña debe tener 8 caractéres, una minuscula, una mayuscula, un simbolo y un número"
      );
      errorCounter++;
    }

    // Password Check
    if (!passwordCheck.value || passwordCheck.value !== password.value) {
      errorCounter++;
    }

    // Si hay al menos un error se detiene el envio y se muestran los mensaje de error
    console.log(errorCounter);
    if (errorCounter > 0) {
      event.preventDefault();
    }
  });
});
