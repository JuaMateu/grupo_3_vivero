window.addEventListener('load',function(){
    let formProduct = document.querySelector(".admin__form");

    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let stock = document.querySelector("#stock");
    let price = document.querySelector("#price");

    let category_id = document.querySelector("#category_id");
    let care_level = document.querySelector("#care_level");
    let label = document.querySelector("#label");
    let img = this.document.querySelector('#img');

    let errorCounter = 0;
    
    // Mostrar los errores en la vista
    showMessage = (element,message) => {
        let paragraph = document.createElement("p");
        paragraph.classList.toggle("text-danger");
        paragraph.innerText = message;
        element.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
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


    // Frenamos el form para validar
    formProduct.addEventListener("submit",function(event){
        errorCounter = 0;

        //eliminar mensajes de error acumulados
        document.querySelectorAll('.text-danger').forEach(e=> e.remove())

        // Nombre de producto
        if (!name.value) {
            showMessage(name,"El nombre de producto debe estar completo");
        } else if (name.value.length < 4) {
            showMessage(name,"El nombre debe tener por lo menos 5 caracteres");
        }

        // descripcion del producto
        if (!description.value) {
            showMessage(description,"El campo de description debe estar completo");

        } else if (description.value.length <20 && description.value.length > 400) {
            showMessage(description,"La descripcion debe tener entre 20 y 400 caracteres");
        };

        // stock 
        if (!stock.value) {
            showMessage(stock,"El stock de producto no puede estar vacío");
        } else if (stock.value < 0 || stock.value > 1000) {
            showMessage(stock,"El stock debe ser un numero entre 0 y 1000");
        }

        // precio
        if (!price.value) {
            showMessage(price,"El precio de producto no puede estar vacío");
        } else if (price.value < 0 || price.value > 1000) {
            showMessage(price,"El stock debe ser un numero entre 0 y 1000");
        } else if (price.value % 1 != 0) {
            showMessage(price,"el precio debe ser un numero entero");
        }

        // let category_id = document.querySelector("#category_id");
        // let care_level = document.querySelector("#care_level");
        // let label = document.querySelector("#label");

        // Si hay errores, detenemos el envio del form
        console.log("veamos errores");
        if (errorCounter > 0) {
            console.log(errorCounter);
            event.preventDefault();
        }

    });
});

