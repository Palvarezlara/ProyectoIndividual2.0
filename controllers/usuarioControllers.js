import { conexion } from "../data/conexion.js";
import moment from "moment";

export const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexion.query(
            `SELECT * FROM funcionarias`
        );
        res.send(usuarios);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: "Algo salio muy mal"
        })
    }
}

//CREAR USUARIO
export const crearUsuario = async (req, res)=>{
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { rut, nombre, apellido, cargo, fechaIngreso, fechaNaci, especialidad, banco, ncuenta, correo, contrasena } = req.body;
    const fechaIngresoFormateada = moment(fechaIngreso).format('YYYY-MM-DD');
    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql = 'INSERT INTO funcionarias (rut, nombre, apellido, cargo, fechaIngreso, fechaNaci, especialidad, banco, ncuenta, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Ejecutar la consulta utilizando el pool de conexiones
    conexion.query(sql, [rut, nombre, apellido, cargo, fechaIngresoFormateada, fechaNaci, especialidad, banco, ncuenta, correo, contrasena], (error, results, fields) => {
      if (error) {
        // Manejar el error utilizando un try-catch
        throw error;
      } else {
        // Devolver una respuesta con el ID del registro insertado
        res.json({ usuario: results.nombre });
      }
    });
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
}