window.addEventListener('load', () => {

    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let emailError = document.querySelector("#emailError")
    let passError = document.querySelector("#passError")

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
    password.addEventListener("focus", (e) => {
        password.classList.remove('is-invalid');
        passError.innerHTML = "";
    });
    password.addEventListener("blur", (e) => {
        if(password.value == ""){
            password.classList.add('is-invalid');
            passError.innerHTML = "El campo no puede estar vacio";
        }
    });

})