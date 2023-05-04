
//DESCARGAR EXCEL DE LA TABLA DE USUARIOS

function obtenerData() {
    // Obtener los datos de la tabla HTML
    const tabla = document.querySelector('table');
    const filas = tabla.querySelectorAll('tbody tr');

    // Crear un array con los datos de cada fila
    const usuarios = [];
    filas.forEach((fila) => {
      const usuario = {
        rut: fila.querySelector('td:nth-child(1)').textContent,
        nombre: fila.querySelector('td:nth-child(2)').textContent,
        apellido: fila.querySelector('td:nth-child(3)').textContent,
        cargo: fila.querySelector('td:nth-child(4)').textContent,
        fechaIngreso: fila.querySelector('td:nth-child(5)').textContent,
        fechaNacimiento: fila.querySelector('td:nth-child(6)').textContent,
        especialidad: fila.querySelector('td:nth-child(7)').textContent,
        banco: fila.querySelector('td:nth-child(8)').textContent,
        numeroCuenta: fila.querySelector('td:nth-child(9)').textContent,
        correo: fila.querySelector('td:nth-child(10)').textContent,
        activo: fila.querySelector('td:nth-child(11)').textContent
      };
      usuarios.push(usuario);
    });

    return usuarios;
  }


function exportarExcel() {
    // Obtener los datos a exportar
    const usuarios = obtenerData();

    // Crear un objeto Workbook de SheetJS
    const workbook = XLSX.utils.book_new();

    // Crear una hoja con los datos
    const worksheet = XLSX.utils.json_to_sheet(usuarios);

    // Agregar la hoja al Workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    // Generar un archivo Excel y descargarlo
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

