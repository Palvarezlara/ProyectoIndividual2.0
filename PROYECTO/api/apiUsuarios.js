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
        window.location.href = "/mantenedor";
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
      <tr>
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
        <td>
          <button type="button" class="btn btn-primary" onclick="editarUsuario('${usuario.rut}')">Editar</button>
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
async function actualizarUsuario(event) {
  event.preventDefault();

  const form = document.querySelector("#form-usuario");
  const rut = form.rut.value;
  const nombre = form.nombre.value;
  const apellido = form.apellido.value;
  const rol = form.rol.value;
  const fechaIngreso = form.fechaIngreso.value;
  const fechaNaci = form.fechaNaci.value;
  const especialidad = form.especialidad.value;
  const banco = form.banco.value;
  const ncuenta = form.ncuenta.value;
  const email = form.email.value;
  const contrasena = form.contrasena.value;

  try {
    const response = await fetch(
      `http://localhost:4000/api/modificarUsuario/${rut}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          rol,
          fechaIngreso,
          fechaNaci,
          especialidad,
          banco,
          ncuenta,
          email,
          contrasena,
        }),
      }
    );

    const { registrosActualizados } = await response.json();

    if (registrosActualizados === 1) {
      Swal.fire({
        title: "Actualizado",
        text: `El usuario con rut ${rut} ha sido actualizado`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Cerramos el modal después de actualizar el usuario
        $("#modal-usuario").modal("hide");
        // Actualizamos la tabla después de actualizar el usuario
        obtenerUsuarios();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se ha podido actualizar el usuario",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    Swal.fire({
      title: "Error",
      text: "No se ha podido actualizar el usuario",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
