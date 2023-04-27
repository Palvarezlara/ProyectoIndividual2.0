function validarRut() {
  let rut = document.getElementById("rut").value;
  let mensaje = document.getElementById("mensaje");
  let rutPattern = /^(\d{1,2}\.?(\d{3})?(\d{3}))\-([\dkK])$/;

  // Remove any periods and hyphens in the RUT
  rut = rut.replace(/\./g, "").replace(/\-/g, "");

  // Add hyphen at the correct position if the RUT length is greater than 1
  if (rut.length > 1) {
    rut = rut.slice(0, -1) + "-" + rut.slice(-1);
    document.getElementById("rut").value = rut;
  }

  if (rutPattern.test(rut)) {
    let numbers = rut.split("-")[0];
    let checkDigit = rut.split("-")[1].toUpperCase();
    let reversedNumbers = numbers.split("").reverse().join("");

    let sum = 0;
    let factor = 2;

    for (let i = 0; i < reversedNumbers.length; i++) {
      sum += parseInt(reversedNumbers[i], 10) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }

    let mod = sum % 11;
    let calculatedCheckDigit = mod === 0 ? "0" : mod === 1 ? "K" : 11 - mod;

    if (checkDigit === calculatedCheckDigit.toString()) {
      mensaje.innerText = "Rut válido";
      mensaje.style.color = "green";
    } else {
      mensaje.innerText = "Rut inválido";
      mensaje.style.color = "red";
    }
  } else {
    mensaje.innerText = "Rut inválido";
    mensaje.style.color = "red";
  }
}

function validarEmail() {
  let email = document.getElementById("email").value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mensajeEmail = document.getElementById("mensajeEmail");

  if (!mensajeEmail) {
    mensajeEmail = document.createElement("div");
    mensajeEmail.id = "mensajeEmail";
    document.getElementById("email").parentNode.appendChild(mensajeEmail);
  }

  if (emailPattern.test(email)) {
    mensajeEmail.innerText = "Email válido";
    mensajeEmail.style.color = "green";
  } else {
    mensajeEmail.innerText = "Email inválido";
    mensajeEmail.style.color = "red";
  }
}

function limpiarFormulario() {
  document.getElementById("rut").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("rol").value = "";
  document.getElementById("dateInicio").value = "";
  document.getElementById("dateNaci").value = "";
  document.getElementById("especialidad").value = "";
  document.getElementById("banco").value = "";
  document.getElementById("cuenta").value = "";
  document.getElementById("email").value = "";
}
