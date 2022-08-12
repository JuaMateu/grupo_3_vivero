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
        // paragraph.style.display = "none";
        errores.push(1);
    }

    // Ocultamos los iconos de "check" al cargar la pagina
    for (i=0; i<OkIcon.length; i++){
        OkIcon[i].style.display = "none";
    }

    formLogin.addEventListener("submit",function(event){
        // Chequeamos si email vacio
        if (!email.value) {
            setTimeout(showMessage(divEmail,"El campo de email debe estar completo"),5000); // probando temporizador
        } else if (!email.value.includes("@") || !email.value.includes(".com")) {
            showMessage(divEmail,"El campo de email debe ser válido");
        }
        // Chequeamos si password vacio
        if (!password.value) {
            showMessage(divPassword,"El campo de password debe estar completo");

        } else if (password.value.length < 8) {
            showMessage(divPassword,"La contraseña debe tener mínimo 8 caracteres");
        }
        // Si hay errores, detenemos el envio del form
        console.log("veamos errores");
        if (errores.length > 1) {
            event.preventDefault();
            console.log(errores.length);
        }
    });
});

