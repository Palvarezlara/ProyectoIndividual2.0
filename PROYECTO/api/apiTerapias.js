//ENVIAR SERVICIO NUEVO DESDE EL PERFIL TERAPEUTA
async function enviarComandaFormulario(formData) {
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
    response
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
};


//CREAR HORARIO DE TURNO DESDE HORARIOS

//CREAR SERVICIO NUEVO DESDE EL REPORTE MODAL

//OBTENER LOS SERVICIOS PARA MOSTRAR EN LA TABLA NO TERMINADO
async function obtenerComanda(rut) {
  console.log("Entré a la función");
  console.log(rut)
  try {
    const response = await fetch(`http://localhost:4000/api/obtenerComanda/${rut}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    );
    const servicios = await response.json();
    console.log(servicios)
    renderReportTerapias(servicios)
  } catch (error) {
    console.error("Error al obtener servicios:", error);
  }
}

function renderReportTerapias(servicios) {
  const tableBody = document.querySelector("#tablaServicios tbody"); // seleccionamos el cuerpo de la tabla
  tableBody.innerHTML = ""; // vaciamos el cuerpo de la tabla
  servicios.forEach((servicio) => {
    const formattedFecha = formatDate(servicio.fecha);
    const row = `
      <tr data-rut="${servicio.rut}">
        <td>${servicio.rut}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.apellido}</td>
        <td>${formattedFecha}</td>
        <td>${servicio.comanda}</td>
        <td>${servicio.nombreTerapia}</td>
        <td>${servicio.comision}</td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row); // agregamos la fila a la tabla
  });
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, así que añadimos 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
//EDITAR LOS SERVICIOS A TRAVES DE MODAL