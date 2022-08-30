window.addEventListener('load',function(){
    // == Selectores DOM ==
    let formLogin = document.querySelector("#formLogin");

    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    
    let divEmail = document.querySelector("#divEmail");
    let divPassword = document.querySelector("#divPassword");

      // RegExp para validar mail
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    // Mostrar los errores en la vista
    showMessage = (element,message) => {
        let paragraph = document.createElement("p");
        paragraph.classList.toggle("text-danger");
        paragraph.innerText = message;
        element.appendChild(paragraph);
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
    
    email.addEventListener("keyup", (event) => {
        divEmail.querySelectorAll('.text-danger').forEach(e=> e.remove())
        divEmail.classList.remove('inputFailure');
    })

      // Borra mensajes de error
    deleteErrorMsg = (element) => {
        element.querySelectorAll('.text-danger').forEach(e=> e.remove())
    }

    password.addEventListener('focus', function (event) {
        deleteErrorMsg(divPassword)
        divPassword.classList.remove("inputFailure");
    })

    // Frenamos el form para validar
    formLogin.addEventListener("submit",function(event){
        let errorCounter = 0;

        // Email
        if (!email.value || !isEmail.test(email.value)) {
            deleteErrorMsg(divEmail)
            showMessage(divEmail,"El Email no es válido");
            inputFailure(divEmail);
            errorCounter++;
            console.log('email invalido')
        } else {
            inputSuccess(divEmail)
        }

        // Password
        if (!password.value) {
            deleteErrorMsg(divPassword)
            showMessage(divPassword,"El campo de password debe estar completo");
            inputFailure(divPassword); 
            errorCounter++;
        } else if (password.value.length < 8) {
            deleteErrorMsg(divPassword)
            showMessage(divPassword,"La contraseña debe tener mínimo 8 caracteres");
            inputFailure(); 
            errorCounter++;
        } else {
            inputSuccess(divEmail);
        };

        // Si hay errores, detenemos el envio del form
        if (errorCounter > 0) {
            event.preventDefault();
        }
    });
});

