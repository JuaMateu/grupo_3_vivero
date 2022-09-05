window.addEventListener('load',function(){
    const showAddress = document.getElementById('showAddress');
    const addressForm = document.getElementById('Admin-addressEdit');
    const streetInput = document.getElementById('street') 

    const userForm = document.getElementById('userForm')
    const addressFormAlert = addressForm.querySelector('.text-danger') 
    
    let name = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let birthDate = document.querySelector("#birth");
    let img = document.getElementById("img");

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


        //   falta imagen y fecha de nacimiento
        console.log(img.value == '')
        
          //img      
        if (img.value != '') {
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


    // Expande el menu de direccion si hay una alerta 
    if(addressFormAlert) {
        addressForm.style.maxHeight = "500px"
        showAddress.innerText = "Ocultar Dirección"
        streetInput.scrollIntoView({ behavior: 'smooth' });
    }

    // Despliega el menu de dirección al clickear el botón
    showAddress.addEventListener('click', function (){
        console.log(addressForm.style.maxHeight )
        if (!addressForm.style.maxHeight || addressForm.style.maxHeight === "0px" ) {
            addressForm.style.maxHeight = "500px";
            street.focus()
            streetInput.scrollIntoView({ behavior: 'smooth' });
            showAddress.innerText = "Ocultar Dirección"
          } else {
            addressForm.style.maxHeight = "0px";
            userForm.scrollIntoView({ behavior: 'smooth' });
            showAddress.innerText = "Editar dirección de entrega"
          }

    }
    )
});