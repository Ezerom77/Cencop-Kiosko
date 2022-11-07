window.addEventListener('load', () => {

    let nombre = document.querySelector("#nombre");
    let nombreError = document.querySelector("#nombreError");
    let apellido = document.querySelector("#apellido");
    let apellidoError = document.querySelector("#apellidoError");
    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailError");

    nombre.addEventListener("focus", (e) => {
        nombre.classList.remove('is-invalid');
        nombreError.innerHTML = "";
    });
    nombre.addEventListener("blur", (e) => {
        if(nombre.value == ""){
            nombre.classList.add('is-invalid');
            nombreError.innerHTML = "El campo no puede estar vacio";
        }
    });

    apellido.addEventListener("focus", (e) => {
        apellido.classList.remove('is-invalid');
        apellidoError.innerHTML = "";
    });
    apellido.addEventListener("blur", (e) => {
        if(apellido.value == ""){
            apellido.classList.add('is-invalid');
            apellidoError.innerHTML = "El campo no puede estar vacio";
        }
    });

    email.addEventListener("focus", (e) => {
        email.classList.remove('is-invalid');
        emailError.innerHTML = "";
    });
    email.addEventListener("blur", (e) => {
        if(email.value == ""){
            email.classList.add('is-invalid');
            emailError.innerHTML = "El campo no puede estar vacio";
        }
    });

})