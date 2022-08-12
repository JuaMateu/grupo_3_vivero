window.addEventListener('load',function(){
    let divEmail = document.querySelector("#divEmail");
    let email = document.querySelector("#email");
    let divPassword = document.querySelector("#divPassword");
    let password = document.querySelector("#password");
    let formLogin = document.querySelector("#formLogin");
    let OkIcon = document.querySelectorAll("#OKIcon");
    let errores = [];
    
    // Mostrar los errores en la vista
    showMessage = (element,message) => {
        let paragraph = document.createElement("p");
        paragraph.classList.toggle("text-danger");
        paragraph.innerText = message;
        element.appendChild(paragraph);
        errores.push(1);
    };

    // Ocultamos los iconos de "check" al cargar la pagina
    hideOk = () => {
        for (i=0; i<OkIcon.length; i++){
            OkIcon[i].style.display = "none";
        }
    };

    //Mostrar mensajes de error
    showOk = () => {
        for (i=0; i<OkIcon.length; i++){
            OkIcon[i].style.display = "block";
        }
    };

    //Eliminacion de mensaje de error y puesta de vuelta a iconos
    continousMessage = () => {
        hideOk();
            setTimeout(function(){
                let hideError = document.querySelector('p'); // seleccionamos elemnto creado en linea 12
                hideError.style.display = "none"
                showOk();
            },5000);
    }

    // Frenamos el form para validar
    formLogin.addEventListener("submit",function(event){
        // Chequeamos si email vacio
        if (!email.value) {
            showMessage(divEmail,"El campo de email debe estar completo");
            continousMessage();
        } else if (!email.value.includes("@") || !email.value.includes(".com")) {
            showMessage(divEmail,"El campo de email debe ser válido");
            continousMessage();
        }
        // Chequeamos si password vacio
        if (!password.value) {
            showMessage(divPassword,"El campo de password debe estar completo");
            continousMessage(); // no llega el scoope de la funcion REVISAR
        } else if (password.value.length < 8) {
            showMessage(divPassword,"La contraseña debe tener mínimo 8 caracteres");
            continousMessage(); // no llega el scoope de la funcion REVISAR
        };
        // Si hay errores, detenemos el envio del form
        console.log("veamos errores");
        if (errores.length > 1) {
            console.log(errores.length);
            event.preventDefault();
        }

        // Si los errores superan a 2 se recarga para evitar aglomeracion de mensajes de error
        if (errores.length > 2){
            location.reload(); 
        };
    });
});

