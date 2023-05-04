//ENVIAR SERVICIO NUEVO DESDE EL PERFIL TERAPEUTA
async function enviarDatosFormulario(formData) {
    const json = formDataToJson(formData);
    console.log(json);
    try {
      const response = await fetch("http://localhost:4000/api/crearComision", {
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
          text: "Servicio ha sido creado correctamente.",
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


//CREAR HORARIO DE TURNO DESDE HORARIOS

//CREAR SERVICIO NUEVO DESDE EL REPORTE MODAL

//OBTENER LOS SERVICIOS PARA MOSTRAR EN LA TABLA NO TERMINADO
async function obtenerServicios() {
    try {
      const response = await fetch("http://localhost:4000/api/obtenerServicios");
      const servicios = await response.json();
      renderServicios(servicios);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  }

  function renderServicios(servicios) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    usuarios.forEach((servicios) => {
        const formattedFechaNaci = formatDate(usuario.fechaNaci);
      const row = `
        <tr data-rut="${servicios.rut}">
          <td>${servicios.nombre}</td>
          <td>${servicios.apellido}</td>
          <td>${servicios.fecha}</td>
          <td>${servicios.comanda}</td>
          <td>${servicios.Servicio}</td>
          <td>${servicios.comision}</td>
          <td>
          <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-rut="${usuario.rut}"
              onclick="editarUsuario(this.getAttribute('data-rut'))"
              data-bs-target="#editarUsuarioModal"
            >
              Editar
            </button>
            <button type="button" class="btn btn-danger" onclick="borrarUsuario('${usuario.rut}')">Borrar</button>
          </td>
        </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }
//EDITAR LOS SERVICIOS A TRAVES DE MODAL