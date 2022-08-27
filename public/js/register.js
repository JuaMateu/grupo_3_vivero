window.addEventListener("load", () => {
  // == Selectores DOM ==
  const form = document.querySelector("#users-form");

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordCheck = document.querySelector("#passwordCheck");

  // contenedores de cada input, se usan para clases de succces o failure
  const div1 = document.querySelector("#div-1");
  const div2 = document.querySelector("#div-2");
  const div3 = document.querySelector("#div-3");
  const div4 = document.querySelector("#div-4");
  const div5 = document.querySelector("#div-5");
  
  // Contador de errores para prevenir el envío del form
  let errorCounter = 0;

  // == FUNCIONES ==

  // Recibe elemento DOM y un mensaje para mostrar en caso de error
  showMessage = (element,message) => {
    let paragraph = document.createElement("p");
    paragraph.classList.toggle("text-danger");
    paragraph.innerText = message;
    element.insertAdjacentElement("afterend", paragraph);
    errorCounter += 1;
  };

  // Asigna clase de error a un input
  inputFailure = (element) => {
    element.classList.remove('inputSuccess')
    element.classList.add('inputFailure')
  }
  // Asigna clase de exito a un input
  inputSuccess = (element) => {
    element.classList.remove('inputFailure')
    element.classList.add('inputSuccess')
  }

  // === Feedback para de cada input === 

  // First name
  firstName.addEventListener("keypress", (event) =>{
    if(!firstName.value || firstName.value.length < 2){
      inputFailure(div1)
    } else {
      inputSuccess(div1)
    }
  })

  // last name
  lastName.addEventListener("keypress", (event) => {
    if(!lastName.value || lastName.value.length < 2){
      inputFailure(div2)
    } else {
      inputSuccess(div2)
    }
  })

  // email
  email.addEventListener("keypress", (event) => {
    if(
      !email.value ||
      !email.value.includes("@") ||
      !email.value.includes(".com")
      ){
      inputFailure(div3)
    } else {
      inputSuccess(div3)
    }
  })

  // password
  password.addEventListener("keypress", (event) => {
    if(!password.value || password.value.length < 8 ){
      inputFailure(div4)
    } else {
      inputSuccess(div4)
    }
  })

  // password check
  passwordCheck.addEventListener("keypress", (event) => {
    if(!passwordCheck.value || passwordCheck.value !== password.value ){
      inputFailure(div5)
    } else {
      inputSuccess(div5)
    }
  })

  // === muestra mensajes de error al hacer submit ===
  form.addEventListener("submit", (event) => {
    errorCounter = 0;
    let errorMsg = document.querySelectorAll('.text-danger').forEach(e=> e.remove())
    console.log(errorMsg)

    // First Name
    if (!firstName.value || firstName.value.length < 3) {
      showMessage(firstName, "El campo de nombre debe contener al menos 3 caracteres.")
    }

    // Last Name
    if (!lastName.value || lastName.value.length < 3 ) {
      showMessage(lastName, "El campo de apellido debe contener al menos 3 caracteres.")
    }

    // Email
    if (
      !email.value ||
      !email.value.includes("@") ||
      !email.value.includes(".com")
    ) {
      showMessage(email, "El campo de email debe ser válido.");
    }
    
    // Password
    if (!password.value || password.value.length < 8) {
      showMessage(password, "El campo de contraseña debe contener al menos 8 caracteres.");
    }
   

    // Password Check
    if (!passwordCheck.value || passwordCheck.value !== password.value) {
      showMessage(passwordCheck, "Ambas campos de contraseña deben coincidir.");
    }
    
    // Si hay al menos un error se detiene el envio y se muestran los mensaje de error 
    console.log(errorCounter)
    if (errorCounter > 0) {
      event.preventDefault()
    }
  });
});
