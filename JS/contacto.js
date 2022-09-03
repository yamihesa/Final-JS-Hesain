//Formulario de Contacto
let form = document.getElementById("form")
//boton Submit
form.addEventListener("submit", e =>{
    e.preventDefault();

})
//Input y Label del formulario
form.innerHTML =`
<div>
<p class="tituloContacto">Contactate Conmigo</p>
</div>
<div class="form-group">
  <label class="nombre">Nombre</label>
  <input id="nombre" name="name" type="text" placeholder="Nombre" class="form-control input">
</div>

<div class="form-group">
  <label class="apellido">Apellido</label>
  <input id="apellido" name="name" type="text" placeholder="Apellido" class="form-control">
</div>
<div class="form-group">
  <label class="email">Email</label>
  <input id="email" name="email" type="text" placeholder="Email" class="form-control">
</div>
<div class="form-group">
  <label class="telefono">Teléfono</label>
  <input id="phone" name="phone" type="text" placeholder="Teléfono" class="form-control">
</div>
<div class="form-group">
  <label class="comentario">Comentario</label>
  <textarea class="form-control" id="message" name="message" placeholder="Deje su mensaje" rows="4"></textarea>
</div>
<div class="form-boton">
  <button id="boton"onclick="getData()" type="submit" class="btn btn enviar">Enviar</button>
</div>
`
//Ingreso de datos en el formulario 
let getData = function(){
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value; 
  if(nombre == ""){
    document.getElementById("nombre").focus()
  }else{
    if(apellido == ""){
      document.getElementById("apellido").focus()
      }else{
        if(email == ""){
          document.getElementById("email").focus()
          }else{  
            if(phone == ""){
              document.getElementById("phone").focus()
              }else{
                if(message == ""){
                  document.getElementById("message").focus()
                }
                //Alert envio mensaje  
                Swal.fire({
                  position: 'top-rigth',
                  icon: 'success',
                  title: 'Su mensaje fue enviado',
                  showConfirmButton: false,
                  timer: 1500
                })

  }
//  
console.log(nombre +" "+ apellido +" " +email+" "+phone+" " +message)
document.getElementById("nombre").value = ""
document.getElementById("apellido").value = ""
document.getElementById("email").value = ""
document.getElementById("phone").value = ""
document.getElementById("message").value = ""
document.getElementById("nombre").focus()
        }
      }
    }
  }