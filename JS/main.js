var carritoDeCompras = []

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");
const comprarBtn = document.getElementById('comprar')

const precioTotal = document.getElementById('totalCompra');
const vaciar = document.getElementById('vaciarCarrito')



const URL = `../stock.json`;

let contenidoJSON = []
let stockProductos = []



  document.addEventListener('DOMContentLoaded', () =>mostrarproductos())

//Mostrar productos
function mostrarproductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(producto => {
                //Renderizando card
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `        
    <img src="${producto.img}" class="img">
    <div class="card-content" id="addCarrito">
    <h5><span class="card-title"> ${producto.nombre} </span><h5></h5>
    <p>$${producto.precio}</p>
    <a id="agregar${producto.id}" class="btn-buy btn ">Comprar<br><i class="fa-solid fa-cart-shopping"></i></a>
    `
    contenedorProductos.appendChild(div);
    //Botón para agregar productos
    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
//Alert producto agregado
Swal.fire({
    icon: 'success',
    title: 'Agregaste al carrito',
    text: (producto.nombre),
    showConfirmButton: true,
    })
})
})
})
}

// carrito vacio
let carritoVacio = document.createElement('div')
carritoVacio.innerHTML = `
    <p class="alert alert-secondary" role="alert">Carrito Vacio</p> `
const avisoVacio = () => {
if(carritoDeCompras.length === 0) {
    contenedorCarrito.append(carritoVacio)
    comprarBtn.className = 'd-none'
    vaciar.className= 'd-none'
}}
avisoVacio()

//Agregar al carrito
const agregarAlCarrito = (prodId) => {
  const existe = carritoDeCompras.find(prod => prod.id === prodId);
  if (existe) {
    const prod = carritoDeCompras.map(prod => {
      if (prod.id === prodId) {
        prod.cantidad ++;
      }
      actualizarCarrito()
    });
  } else {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        const item = data.find((prod) => prod.id == prodId)
        carritoDeCompras.push(item)
        actualizarCarrito()
        guardarCarrito()
    })
}
}


//Eliminar producto
function eliminarDelCarrito(prodID) {
    const item = carritoDeCompras.find((prod) => prod.id === prodID)
    const indice = carritoDeCompras.indexOf(item)
    if (carritoDeCompras[indice].cantidad === 1) {
        carritoDeCompras.splice(indice, 1)
        actualizarCarrito()
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-center',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Eliminaste el producto del carrito',
          })
    } else {
        carritoDeCompras[indice].cantidad -= 1
        actualizarCarrito()
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-center',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Eliminaste el producto del carrito'
          })
    }
}

//vaciar carrito
const vaciarCarrito = () => {
    carritoDeCompras = []
    actualizarCarrito()
}

vaciar.addEventListener('click', ()=> vaciarCarrito())


//Actualizar carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carritoDeCompras.forEach((prod) => {
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito', 'd-flex', 'w-100')
        div.id = `${prod.id}`
        div.innerHTML = `
        <p class="px-3"><span id= "cantidad">${prod.cantidad}</span></p>
        <p class="px-3">${prod.nombre}</p>
        <p>$${prod.precio*prod.cantidad}</p>
        <span onClick = (eliminarDelCarrito(${div.id})) class="px-3" role='button'><i class="fa-solid fa-trash"></i><span>
        `

    contenedorCarrito.appendChild(div);
    })
    let total= carritoDeCompras.reduce((acc, prod)=> acc + prod.precio*prod.cantidad, 0)
    precioTotal.innerText = `Total $${total}`
    comprarBtn.className = 'btn botonComprar'
    vaciar.className = 'btn botonVaciar'
    guardarCarrito()
    avisoVacio()

}

//filtrado
function filtrarProd(id){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        contenedorProductos.innerHTML = ""
        if (id === 'Todos') {
            mostrarproductos()
        }
        const filtrarproductos = data.filter((prod) => prod.id === id)

        filtrarproductos.forEach(producto => {
            //Renderizando card
            const div = document.createElement('div')
            div.classList.add('card')
            div.innerHTML = `        
            <div class="card">
            <img src="${producto.img}">
            <div class="card-nombre">${producto.nombre}>
            </div>
            <div class="card-content" id="addCarrito">
            <p>$${producto.precio}</p>
            <a id="agregar${producto.id}" class="btn-buy btn btn-primary">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
            </div>
            </div>
            `
            contenedorProductos.appendChild(div);
            //Botón para agregar productos
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id)
                //Alert
                Swal.fire({
                    icon: 'success',
                    title: 'Agregaste al carrito',
                    text: (producto.nombre),
                    showConfirmButton: true,
                })
            })
        })
    })
} 

 //guardo carrito
const guardarCarrito = () => {
    if (carritoDeCompras.length > 0) {
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    } else {
        localStorage.clear()
    }
}
//recuperando datos de carrito
function recuperoDatosCarrito() {
    if (miCarrito = JSON.parse(localStorage.getItem('carrito'))) {
        miCarrito.forEach(prod => {
            carritoDeCompras.push(prod)
        })
        actualizarCarrito()
    }
}
recuperoDatosCarrito()




