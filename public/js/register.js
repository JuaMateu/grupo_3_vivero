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
  
  // ==== FUNCIONES ====

  // Recibe elemento DOM y un mensaje para mostrar en caso de error
  showMessage = (element,message) => {
    let paragraph = document.createElement("p");
    paragraph.classList.toggle("text-danger");
    paragraph.innerText = message;
    element.insertAdjacentElement("afterend", paragraph);
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

  // Controla que la pasword sea segura y da feedback con cada keyup del usuario
  passwordStrengthChecker = (p) => {
    let passwordStrength = 5;
    let Weaknesses = [];
    div4.querySelectorAll('.text-danger').forEach(e=> e.remove())

    p.length < 8 ? Weaknesses.push("Debe contener como minimo 8 caracteres") : passwordStrength--
    p.match(/[a-z]/g) === null ? Weaknesses.push("Debe contener una minúscula") : passwordStrength--
    p.match(/[A-Z]/g) === null ? Weaknesses.push("Debe contener una mayúscula") : passwordStrength--
    p.match(/[\W]/g) === null ? Weaknesses.push("Debe contener un símbolo") : passwordStrength--
    p.match(/[0-9]/g) === null ? Weaknesses.push("Debe contener número") : passwordStrength--

    Weaknesses.forEach(w => showMessage(password, w))
    Weaknesses.length > 0 ? inputFailure(div4) : "";
    return passwordStrength
  }
  
  
  // === VALIDACIONES ON KEYUP PARA DAR FEEDBACK INSTANTANEO === 

  // First Name
  firstName.addEventListener("keyup", (event) =>{
    div1.querySelectorAll('.text-danger').forEach(e=> e.remove())
    if(!firstName.value || firstName.value.length < 3){
      inputFailure(div1)
      showMessage(firstName, "El campo de nombre debe contener al menos 3 caracteres.")
    } else {
      inputSuccess(div1)
    }
  })

  // Last name
  lastName.addEventListener("keyup", (event) => {
    div2.querySelectorAll('.text-danger').forEach(e=> e.remove())
    if(!lastName.value || lastName.value.length < 3){
      inputFailure(div2)
      showMessage(lastName, "El campo de apellido debe contener al menos 3 caracteres.")
    } else {
      inputSuccess(div2)
    }
  })

  // Email
  email.addEventListener("keyup", (event) => {
    div3.querySelectorAll('.text-danger').forEach(e=> e.remove())
    if(
      !email.value ||
      !email.value.includes("@") ||
      !email.value.includes(".com")
      ){
      showMessage(email, "El campo de email debe ser válido.");
      inputFailure(div3)
    } else {
      inputSuccess(div3)
    }
  })

  // Password
  password.addEventListener("keyup", (event) => {
    
    if(passwordStrengthChecker(password.value) > 0 ){
      inputFailure(div4)
    } else {
      inputSuccess(div4)
    }
  })

  // Password check
  passwordCheck.addEventListener("keyup", (event) => {
    div5.querySelectorAll('.text-danger').forEach(e=> e.remove())
    if(!passwordCheck.value || passwordCheck.value !== password.value ){
      inputFailure(div5)
      showMessage(passwordCheck, "Ambas campos de contraseña deben coincidir.");
    } else {
      inputSuccess(div5)
    }
  })

  // fin validaciones onkeyup

  // === VALIDACIONES ON SUBMIT ===

  form.addEventListener("submit", (event) => {
    let errorCounter = 0;

    // First Name
    if (!firstName.value || firstName.value.length < 3) {
      div1.querySelectorAll('.text-danger').forEach(e=> e.remove())
      showMessage(firstName, "El nombre debe contener al menos 3 caracteres.")
      errorCounter++
    }
    
    // Last Name
    if (!lastName.value || lastName.value.length < 3 ) {
      div2.querySelectorAll('.text-danger').forEach(e=> e.remove())
      showMessage(lastName, "El apellido debe contener al menos 3 caracteres.")
      errorCounter++
    }
    
    // Email
    if (
      !email.value ||
      !email.value.includes("@") ||
      !email.value.includes(".com")) {
      div3.querySelectorAll('.text-danger').forEach(e=> e.remove())
      showMessage(email, "Debes ingresar una direccion válida")
      errorCounter++
      
    }
      
      // Password
      if (passwordStrengthChecker(password.value) > 0) {
        errorCounter++
      }
      
      
      // Password Check
      if (!passwordCheck.value || passwordCheck.value !== password.value) {
        errorCounter++
      }
      
    // Si hay al menos un error se detiene el envio y se muestran los mensaje de error 
    console.log(errorCounter)
    if (errorCounter > 0) {
      console.log(`se previene el default, Errores:${errorCounter}`)
      event.preventDefault()
    }
  });
});
