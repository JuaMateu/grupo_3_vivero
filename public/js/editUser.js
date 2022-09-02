window.addEventListener('load',function(){
    const showAddress = document.getElementById('showAddress');
    const addressForm = document.getElementById('Admin-addressEdit');
    const streetInput = document.getElementById('street') 
    const firstName = document.getElementById('firstName')
    const userForm = document.querySelector('.admin-form__conteiner')
    const addressFormAlert = addressForm.querySelector('.text-danger')  

    if(addressFormAlert) {
        addressForm.style.maxHeight = "500px"
        showAddress.innerText = "Ocultar Dirección"
        streetInput.scrollIntoView({ behavior: 'smooth' });
    }


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