import { conexion } from "../data/conexion.js";
import moment from "moment";

//para obtener todos los usuarios de la tabla
export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await conexion.query(`SELECT * FROM funcionarias`);
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Algo salio muy mal",
    });
  }
};

//Para crear usuarios nuevos 
export const crearUsuario = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      rut,
      nombre,
      apellido,
      cargo,
      fechaIngreso,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      correo,
      contrasena,
    } = req.body;

    // Validar el formato del RUT chileno utilizando una expresión regular
    if (!/^([0-9]{1,2}\.)?[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(rut)) {
      return res.status(400).json({ mensaje: "El RUT ingresado no es válido" });
    }

    // Validar el formato del correo electrónico utilizando una expresión regular
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
      return res
        .status(400)
        .json({ mensaje: "El correo electrónico ingresado no es válido" });
    }

    const fechaIngresoFormateada = moment(fechaIngreso).format("YYYY-MM-DD");
    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql =
      "INSERT INTO funcionarias (rut, nombre, apellido, cargo, fechaIngreso, fechaNaci, especialidad, banco, ncuenta, correo, contrasena) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    // Ejecutar la consulta utilizando el pool de conexiones
    conexion.query(
      sql,
      [
        rut,
        nombre,
        apellido,
        cargo,
        fechaIngresoFormateada,
        fechaNaci,
        especialidad,
        banco,
        ncuenta,
        correo,
        contrasena,
      ],
      (error, results, fields) => {
        if (error) {
          // Manejar el error utilizando un try-catch
          throw error;
        } else {
          // Devolver una respuesta con el ID del registro insertado
          res.json({ usuario: results.nombre });
        }
      }
    );
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

//MODIFICAR USUARIO
export const modificarUsuario = async (req, res) => {
  try {
    // Obtener el rut del usuario a modificar desde los parámetros de la solicitud
    const { rut } = req.params;

    // Obtener los datos del cuerpo de la solicitud
    const {
      nombre,
      apellido,
      cargo,
      fechaIngreso,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      correo,
      contrasena,
    } = req.body;

    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql =
      "UPDATE funcionarias SET nombre = ?, apellido = ?, cargo = ?, fechaIngreso = ?, fechaNaci = ?, especialidad = ?, banco = ?, ncuenta = ?, correo = ?, contrasena = ? WHERE rut = ?";

    // Formatear la fecha de ingreso
    const fechaIngresoFormateada = moment(fechaIngreso).format("YYYY-MM-DD");

    // Ejecutar la consulta utilizando el pool de conexiones
    const [resultado] = await conexion.query(sql, [
      nombre,
      apellido,
      cargo,
      fechaIngresoFormateada,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      correo,
      contrasena,
      rut,
    ]);

    // Devolver una respuesta con el número de registros actualizados
    res.json({ registrosActualizados: resultado.affectedRows });
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

//BORRAR USUARIO POR RUT
export const borrarUsuario = async (req, res) => {
  try {
    // Obtener el rut del usuario a eliminar desde los parámetros de la solicitud
    const { rut } = req.params;

    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql = "UPDATE funcionarias SET activo = false WHERE rut = ?";

    // Ejecutar la consulta utilizando el pool de conexiones
    const [resultado] = await conexion.query(sql, [rut]);

    // Devolver una respuesta con el número de registros actualizados
    res.json({ registrosActualizados: resultado.affectedRows });
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

//REACTIVAR USUARIOS POR RUT
export const reactivarUsuario = async (req, res) => {
  try {
    // Obtener el rut del usuario a reactivar desde los parámetros de la solicitud
    const { rut } = req.params;

    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql = "UPDATE funcionarias SET activo = true WHERE rut = ?";

    // Ejecutar la consulta utilizando el pool de conexiones
    const [resultado] = await conexion.query(sql, [rut]);

    // Devolver una respuesta con el número de registros actualizados
    res.json({ registrosActualizados: resultado.affectedRows });
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};
