//Formulario de Compra
const formulario = document.getElementById('formulario')
const inputNombre = document.querySelector("#inputNombre")
const inputApellido = document.querySelector("#inputApellido")
const inputTel = document.querySelector("#inputTelefono")
const inputEmail = document.querySelector("#inputEmail")
const btnSubmit = document.querySelector("#submit")

//Guardar Datos
function guardarDatosDeUser() {
    const datosUser = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        telefono: inputTel.value,
        email: inputEmail.value,
    };
    let str = JSON.stringify(datosUser)
    localStorage.setItem("datosUser", str)

}

function recuperoDatosUser() {
    if (localStorage.getItem("datosUser")) {
        const datosUser = JSON.parse(localStorage.getItem("datosUser"))
        inputNombre.value = datosUser.nombre
        inputApellido.value = datosUser.apellido
        inputTel.value = datosUser.telefono
        inputEmail.value = datosUser.email
    }
}

//validar formulario
const enviarForm = () => {
    var error =[]
    if (inputNombre.value === null || inputNombre.value === "") error.push('Nombre')
    if (inputApellido.value === null || inputApellido.value === "") error.push('Apellido')
    if (inputTel.value === null || inputTel.value === "" || inputTel.value.length < 9) error.push('Teléfono')
    if(inputEmail.value === null || inputEmail.value === "") error.push('Email')
    let text = error.join(' - ')
    if (error.length > 0) {
        Swal.fire({
            title: 'Completa todos los Datos',
            text: text,
            icon: 'error',
            confirmButtonText: 'OK'})
    }
    if (error.length === 0) alertForm('¿Finalizar compra?')
}

//Submit del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser(),
    enviarForm() ;
})

//Alert del formulario
const alertForm = (mensaje) => {
    Swal.fire({
        title: mensaje,
        text: 'Hola '+ inputNombre.value.toUpperCase() + ' !!! ' + 'te enviaremos los datos de tu compra a '+  inputEmail.value,
        confirmButtonText: 'Finalizar compra',
        showCancelButton: true,
        cancelButtonText: "Volver"
    })
    .then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('datosUser')
            localStorage.removeItem('carrito')
            Swal.fire({
                title: '¡Gracias por tu compra!',
                text: '',
                confirmButtonText: 'OK',
            })
            .then((result) => result ? window.location.href = "./productos.html" : null)
    }
    })
}

recuperoDatosUser()
