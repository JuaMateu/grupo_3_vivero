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

        // categoría
        console.log()
        console.log(category_id.options.length)
        if (!category_id.value) {
            showMessage(category_id,"La categoría no puede estar vacía");
        } else if (Number(category_id.value) < 1 
        || Number(category_id.value) > category_id.options.length 
        || Number(category_id.value) % 1 != 0) {
            showMessage(category_id,"Debes elegir una de las opciones");
        } 
        
        // Care Level 
        if (!care_level) {
            showMessage(care_level,"Debes elegir un nivel de cuidados para la planta");
        } else if (care_level.value != "Básico" 
        && care_level.value != "Intermedio"
        && care_level.value != "Experto") {
            showMessage(care_level,"Debes elegir una de las opciones");
        } 
        // Label
        if (!label) {
            showMessage(label,"Debes elegir un nivel de cuidados para la planta");
        } else if (label.value != "none" 
        && label.value != "Oferta"
        && label.value != "Mas vendida") {
            showMessage(label,"Debes elegir una de las opciones");
        } 

        //img 
        let imgExtention = img.value.split(".")[1]
        if (imgExtention != "jpg" 
        && imgExtention != "gif"
        && imgExtention != "png"
        && imgExtention != "jpeg") {
            showMessage(img,"las extensiones aceptadas son jpg, gif, png y jpeg");
        } 

        // Si hay errores, detenemos el envio del form
        if (errorCounter > 0) {
            console.log(errorCounter);
            event.preventDefault();
        }

    });
});

