// CREAR USUARIO
async function enviarDatosFormulario(formData) {
  const json = formDataToJson(formData);
  console.log(json);
  try {
    const response = await fetch("http://localhost:4000/api/crearUsuario", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Si la respuesta es exitosa, muestra una alerta de éxito
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      Swal.fire({
        title: "Éxito!",
        text: "El usuario ha sido creado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        location.reload();
      });
    } else {
      // Si hay algún error, muestra una alerta de error
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      Swal.fire({
        title: "Error!",
        text: "Ha ocurrido un error al crear el usuario.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function formDataToJson(formData) {
  const json = {};

  for (let [key, value] of formData.entries()) {
    json[key] = value;
  }

  return JSON.stringify(json);
}

// OBTENER USUARIO
async function obtenerUsuarios() {
  try {
    const response = await fetch("http://localhost:4000/api/obtenerUsuarios");
    const usuarios = await response.json();
    renderUsuarios(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

function renderUsuarios(usuarios) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";

  usuarios.forEach((usuario) => {
    const formattedFechaIngreso = formatDate(usuario.fechaIngreso);
    const formattedFechaNaci = formatDate(usuario.fechaNaci);
    const row = `
      <tr data-rut="${usuario.rut}">
        <td>${usuario.rut}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.rol}</td>
        <td>${formattedFechaIngreso}</td>
        <td>${formattedFechaNaci}</td>
        <td>${usuario.especialidad}</td>
        <td>${usuario.banco}</td>
        <td>${usuario.ncuenta}</td>
        <td>${usuario.email}</td>
        <td>${usuario.activo}</td> 
        <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"data-rut="${usuario.rut}" onclick="editarUsuario(this.getAtribute('data-rut'))" data-bs-target="#editarUsuarioModal">Editar</button>
          <button type="button" class="btn btn-danger" onclick="borrarUsuario('${usuario.rut}')">Borrar</button>
        </td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, así que añadimos 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// BORRAR USUARIO
function borrarUsuario(rut) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:4000/api/borrarUsuario/${rut}`, {
        method: "PUT",
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "Borrado",
            text: `El usuario con rut ${rut} ha sido borrado`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Actualizamos la tabla después de borrar el usuario
            obtenerUsuarios();
          });
        })
        .catch((error) => {
          console.error("Error al borrar el usuario:", error);
          Swal.fire({
            title: "Error",
            text: "No se ha podido borrar el usuario",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  });
}

// MODIFICAR USUARIO
function editarUsuario(rut) {
  // Buscar la fila de la tabla que contiene el rut del usuario
  const filaUsuario = document.querySelector(
    `table tbody tr[data-rut="${rut}"]`
  );
// Extraer la información de la fila
const nombre = filaUsuario.querySelector("td:nth-child(2)").innerText;
const apellido = filaUsuario.querySelector("td:nth-child(3)").innerText;
const rol = filaUsuario.querySelector("td:nth-child(4)").innerText;
//const fechaIngreso = filaUsuario.querySelector("td:nth-child(5)").innerText;
//const fechaNaci = filaUsuario.querySelector("td:nth-child(6)").innerText;
const especialidad = filaUsuario.querySelector("td:nth-child(7)").innerText;
const banco = filaUsuario.querySelector("td:nth-child(8)").innerText;
const ncuenta = filaUsuario.querySelector("td:nth-child(9)").innerText;
const email = filaUsuario.querySelector("td:nth-child(10)").innerText;

const fechaIngreso = filaUsuario.querySelector("td:nth-child(5)").innerText;
const fechaIngresoFormateada = fechaIngreso.split("/").reverse().join("-");

const fechaNaci = filaUsuario.querySelector("td:nth-child(6)").innerText;
const fechaNaciFormateada = fechaNaci.split("/").reverse().join("-");

console.log(fechaIngreso, fechaNaciFormateada);

// Cargar la información del usuario en el modal
document.querySelector("#editar-nombre").value = nombre;
document.querySelector("#editar-apellido").value = apellido;
document.querySelector("#editar-rol").value = rol;
document.querySelector("#editar-fechaIngreso").value = fechaIngresoFormateada;
document.querySelector("#editar-fechaNaci").value = fechaNaciFormateada;
document.querySelector("#editar-especialidad").value = especialidad;
document.querySelector("#editar-banco").value = banco;
document.querySelector("#editar-ncuenta").value = ncuenta;
document.querySelector("#editar-email").value = email;

// Manejar el envío del formulario al hacer click en el botón "Guardar"
const botonGuardar = document.querySelector("#guardarCambios");
botonGuardar.addEventListener("click", (event) => {
  event.preventDefault();
  const formulario = event.target.closest("form");
  const formData = new FormData(formulario);
  console.log(rut);
  actualizarUsuario(formData, rut);
});
}

async function actualizarUsuario(formData, rut) {
const json = formDataToJson(formData);
console.log(json);
try {
  const response = await fetch(
    `http://localhost:4000/api/modificarUsuario/${rut}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }
  );

  if (response.ok) {
    Swal.fire({
      icon: "success",
      title: "Usuario actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload(); // Recarga la página para actualizar la tabla
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error al actualizar el usuario",
      text: "Ha ocurrido un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo.",
    });
  }
} catch (error) {
  console.error("Error en la petición:", error);
  Swal.fire({
    icon: "error",
    title: "Error al actualizar el usuario",
    text: "Ha ocurrido un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo.",
  });
}
}