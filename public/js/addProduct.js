window.addEventListener('load',function(){
    let formProduct = document.querySelector(".admin__form");

    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let stock = document.querySelector("#stock");
    let price = document.querySelector("#price");

    let category_id = document.querySelector("#category_id");
    let care_level = document.querySelector("#care_level");
    let label = document.querySelector("#label");

    let errores = [];
    
    // Mostrar los errores en la vista
    showMessage = (element,message) => {
        let paragraph = document.createElement("p");
        paragraph.classList.toggle("text-danger");
        paragraph.innerText = message;
        element.insertAdjacentElement("afterend", paragraph);
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
    formProduct.addEventListener("submit",function(event){
        
        // Chequeamos si name vacio
        if (!name.value) {
            showMessage(name,"El nombre de producto debe estar completo");

        } else if (name.value.length < 3) {
            showMessage(name,"El campo de nombre debe tener mas de 3 caracteres");
        }
        // Chequeamos si description vacio y tiene menos de 400 caracteres
        if (!description.value) {
            showMessage(description,"El campo de description debe estar completo");

        } else if (password.value.length > 400) {
            showMessage(description,"La descripción no puede superar 400 caracteres");
        };
        // let stock = document.querySelector("#stock");
        // let price = document.querySelector("#price");

        // let category_id = document.querySelector("#category_id");
        // let care_level = document.querySelector("#care_level");
        // let label = document.querySelector("#label");

        // Si hay errores, detenemos el envio del form
        console.log("veamos errores");
        if (errores.length >= 1) {
            console.log(errores.length);
            event.preventDefault();
        }

        // Si los errores superan a 2 se recarga para evitar aglomeracion de mensajes de error
        if (errores.length > 2){
            // location.reload(); 
        };
    });
});

