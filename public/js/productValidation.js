window.addEventListener('load', ()  => {
    let productForm = document.querySelector('form');
    let productName = document.getElementById('productName');
    let productDescription = document.getElementById('productDescription');
    let productCategory = document.getElementById('categorias');
    let productPrice = document.getElementById('productPrice');
    let productImage = document.getElementById('productImage');
    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    

    productName.classList.remove('is-invalid');
    productDescription.classList.remove('is-invalid');
    productCategory.classList.remove('is-invalid');
    productPrice.classList.remove('is-invalid');
    productImage.classList.remove('is-invalid');
    productName.nextElementSibling.innerHTML = "";
    productDescription.nextElementSibling.innerHTML = "";
    productCategory.nextElementSibling.innerHTML = "";
    productPrice.nextElementSibling.innerHTML = "";
    productImage.nextElementSibling.innerHTML = "";
    
    productName.addEventListener("focus", (e) => {
        productName.classList.remove('is-invalid');
        productName.nextElementSibling.innerHTML = "";
    });
    productDescription.addEventListener("focus", (e) => {
        productDescription.classList.remove('is-invalid');
        productDescription.nextElementSibling.innerHTML = "";
    });
    productCategory.addEventListener("focus", (e) => {
        productCategory.classList.remove('is-invalid');
        productCategory.nextElementSibling.innerHTML = "";
    });
    productPrice.addEventListener("focus", (e) => {
        productPrice.classList.remove('is-invalid');
        productPrice.nextElementSibling.innerHTML = "";
    });
    // productImage.addEventListener("focus", (e) => {
    //     productImage.classList.remove('is-invalid');
    //     productImage.nextElementSibling.innerHTML = "";
    // });
  
    productName.addEventListener("blur", (e) => {
        if (productName.value == "" || productName.value.length < 5) {
            productName.classList.add('is-invalid');
            productName.nextElementSibling.innerHTML = "* Debes completar el nombre del producto y este tiene que tener más de 5 caracteres";
        }
    });
    productDescription.addEventListener("blur", (e) => {
        if (productDescription.value.length < 5) {
            productDescription.classList.add('is-invalid');
            productDescription.nextElementSibling.innerHTML = "* La descripción del producto debe tener al menos 5 caracteres";
        }
    });
    productCategory.addEventListener("blur", (e) => {
        if (productCategory.value == "") {
            productCategory.classList.add('is-invalid');
            productCategory.nextElementSibling.innerHTML = "* Debes seleccionar al menos una categoría";
        }
    });
    productPrice.addEventListener("blur", (e) => {
        if (productPrice.value == "") {
            productPrice.classList.add('is-invalid');
            productPrice.nextElementSibling.innerHTML = "* Debes ingresar el precio del producto";
        }
    });
    // productImage.addEventListener("blur", (e) => {
    //     if (productImage.value == "") {
    //         productImage.classList.add('is-invalid');
    //         productImage.nextElementSibling.innerHTML = "* Debes subir al menos una imagen";
    //     }
    //     });

    

    /* DEJAMOS ABAJO DESHABILITADO PARCIALMENTE PORQUE SI SE HABILITA, NO FUNCIONAN LAS VALIDACIONES DE BACKEND.
    DEJAMOS HABILITADA SOLO LA VALIDACION DE IMAGEN EN EL FRONT PARA FRENAR EL FORMULARIO Y EL RESTO SE VALIDA 
    TAMBIEN EN EL BACKEND.
    EL CODIGO ANDA BIEN. SIMPLEMENTE DESCOMENTAR Y LISTO. */
    
    
    productForm.addEventListener("submit", (e) => {
        if (productImage.value == ""
            || productImage.value.length < 5
 /*           || productName.value == ""
            || productName.value.length < 5
            || productDescription.value.length < 20
            || productCategory.value == ""
            || productPrice.value == ""
*/
                ) {
            e.preventDefault();
            return alert('Por favor, subir entre 1 y 4 imagenes');
        
        }   else {  
            e.submit()       
            }   
    }); 
});