window.addEventListener('load',function(){
    let userForm = document.querySelector(".admin__form");

    let name = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let birthDate = document.querySelector("#birth");
    let img = document.getElementById("category_id");

    // RegExp para validar mail
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let errorCounter = 0;
    
    showMessage = (element,message) => {
        inputFailure(element.parentElement)
        let paragraph = document.createElement("p");
        paragraph.classList.toggle("text-danger");
        paragraph.innerText = message;
        element.insertAdjacentElement("afterend", paragraph);
        
    };

    // Asigna clase de error a un input
    inputFailure = (element) => {
        element.classList.remove('inputSuccess');
        element.classList.add('inputFailure');
    }
    // Asigna clase de exito a un input
    inputSuccess = (element) => {
        element.classList.remove('inputFailure');
        element.classList.add('inputSuccess'); 
    }
    // Borra mensajes de error
    deleteErrorMsg = (element) => {
        element.querySelectorAll('.text-danger').forEach(e=> e.remove())
    }

    // Controla que la pasword sea segura y da feedback con cada keyup del usuario
  passwordStrengthChecker = (passInput) => {
    //
    let pass = passInput.value
    // fuerza de la password
    let passwordStrength = 0;
    //mensajes de error
    let Weaknesses = [];
    // Se eliminan mensajes de alerta para evitar acumulacion
    deleteErrorMsg(passInput.parentElement);

    //condiciones, si se cumplen aumenta 1 la fz, si no agregan un mensaje de error al array
    pass.length >= 8 ? passwordStrength++ : Weaknesses.push("Debe contener como minimo 8 caracteres");
    (/[a-z]/g).test(pass) ? passwordStrength++ : Weaknesses.push("Debe contener una minúscula");
    (/[A-Z]/g).test(pass) ? passwordStrength++ : Weaknesses.push("Debe contener una mayúscula");
    (/[\W]/g).test(pass) ? passwordStrength++ : Weaknesses.push("Debe contener un símbolo");
    (/[0-9]/g).test(pass) ? passwordStrength++ : Weaknesses.push("Debe contener número");

    console.log(pass)

    // Weaknesses.forEach(w => showMessage(password, w))
    if(Weaknesses.length < 5 && pass) { 
      Weaknesses.forEach(w => {
        let p = document.createElement("p");
        p.classList.add("text-danger");
        p.innerText = w;
        passInput.insertAdjacentElement("afterend", p);
      }) 
  } else if (!pass) {
    let p = document.createElement("p");
    p.classList.add("text-danger");
    p.innerText = 'la contraseña no puede quedar vacía';
    passInput.insertAdjacentElement("afterend", p);
  }

    Weaknesses.length > 0 ? inputFailure(passInput.parentElement) : "";
    return passwordStrength
  }

    // Frenamos el form para validar
    userForm.addEventListener("submit",function(event){
        
        errorCounter = 0

        
        //eliminar mensajes de error acumulados
        document.querySelectorAll('.text-danger').forEach(e=> e.remove())

        // Nombre de usuario
        if (!name.value) {
            showMessage(name,"El nombre de usuario debe estar completo");
            errorCounter++
        } else if (name.value.length < 2) {
            showMessage(name,"El nombre debe tener por lo menos 3 caracteres");
            errorCounter++
        } else {
            inputSuccess(name.parentElement)
        }

        // Apellido de usuario
        if (!lastName.value) {
            showMessage(lastName,"El apellido de usuario debe estar completo");
            errorCounter++
        } else if (lastName.value.length < 2) {
            showMessage(lastName,"El apellido debe tener por lo menos 3 caracteres");
            errorCounter++
        } else {
            inputSuccess(lastName.parentElement)
        }

        // Email de usuario
        if(!email.value || !isEmail.test(email.value)) {
            showMessage(email, "El campo de email debe ser válido.");
            inputFailure(email.parentElement)
          } else {
            inputSuccess(email.parentElement)
          }

        // password de usuario
        if(passwordStrengthChecker(password) < 5 ){
            inputFailure(password.parentElement)
            errorCounter++
          } else {
            inputSuccess(password.parentElement)
          }

        //   falta imagen y fecha de nacimiento
        console.log(birthDate.value)
        
          //img      
        if (img) {
            let imgExtention = img.value.split(".")[1]
            if (imgExtention != "jpg" 
            && imgExtention != "gif"
            && imgExtention != "png"
            && imgExtention != "jpeg") {
                showMessage(img,"las extensiones aceptadas son jpg, gif, png y jpeg");
                errorCounter++
            } else { 
                inputSuccess(img.parentElement)
            }
        } 
        
        
        // Si hay errores, detenemos el envio del form
        
        console.log(errorCounter);
        if (errorCounter > 0) {
            event.preventDefault()
        }


    });
});

