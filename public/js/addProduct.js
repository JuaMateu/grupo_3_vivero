window.addEventListener('load',function(){
    let formProduct = document.querySelector(".admin__form");

    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let stock = document.querySelector("#stock");
    let price = document.querySelector("#price");

    let category_id = document.getElementById("category_id");
    let care_level = document.querySelector("#care_level");
    let label = document.querySelector("#label");
    let img = document.querySelector('#img');

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
    formProduct.addEventListener("submit",function(event){

        errorCounter = 0

        
        //eliminar mensajes de error acumulados
        document.querySelectorAll('.text-danger').forEach(e=> e.remove())

        // Nombre de producto
        if (!name.value) {
            showMessage(name,"El nombre de producto debe estar completo");
            errorCounter++
        } else if (name.value.length < 4) {
            showMessage(name,"El nombre debe tener por lo menos 5 caracteres");
            errorCounter++
        } else {
            inputSuccess(name.parentElement)
        }

        // descripcion del producto
        if (!description.value) {
            showMessage(description,"El campo de description debe estar completo");
            errorCounter++
        } else if (description.value.length <20 && description.value.length > 400) {
            showMessage(description,"La descripcion debe tener entre 20 y 400 caracteres");
            errorCounter++
        } else {
            inputSuccess(description.parentElement)
        }

        // stock 
        if (!stock.value) {
            showMessage(stock,"El stock de producto no puede estar vacío");
            errorCounter++
        } else if (stock.value < 0 || stock.value > 1000) {
            showMessage(stock,"El stock debe ser un numero entre 0 y 1000");
            errorCounter++
        } else {
            inputSuccess(stock.parentElement)
        }

        // precio
        if (!price.value) {
            showMessage(price,"El precio de producto no puede estar vacío");
            errorCounter++
        } else if (price.value < 500 || price.value > 40000) {
            showMessage(price,"El Precio debe estar entre 500 y 40000");
            errorCounter++
        } else if (price.value % 1 != 0) {
            showMessage(price,"el precio debe ser un numero entero");
            errorCounter++
        } else {
            inputSuccess(price.parentElement)
        }

        // categoría
        if (!category_id.value) {
            showMessage(category_id,"La categoría no puede estar vacía");
            errorCounter++
        } else if (Number(category_id.value) < 1 
        || Number(category_id.value) > category_id.options.length 
        || Number(category_id.value) % 1 != 0) {
            showMessage(category_id,"Debes elegir una de las opciones");
            errorCounter++
        } else { 
            inputSuccess(category_id.parentElement)
        }
        
        // Care Level 
        if (!care_level) {
            showMessage(care_level,"Debes elegir un nivel de cuidados para la planta");
            errorCounter++
        } else if (care_level.value != "Básico" 
        && care_level.value != "Intermedio"
        && care_level.value != "Experto") {
            showMessage(care_level,"Debes elegir una de las opciones");
            errorCounter++
        } else {
            inputSuccess(care_level.parentElement)
        }
        // Label
        if (!label) {
            showMessage(label,"Debes elegir un nivel de cuidados para la planta");
            errorCounter++
        } else if (label.value != "none" 
        && label.value != "Oferta"
        && label.value != "Mas vendida") {
            showMessage(label,"Debes elegir una de las opciones");
            errorCounter++
        } else {
            inputSuccess(label.parentElement)
        }

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

