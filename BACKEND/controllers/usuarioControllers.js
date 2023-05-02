import pool from "../db/conexion.js";
import moment from "moment";

//para comprobar la información del usuario y hacer el login
export const comprobarUsuario = async (req, res) => {
  const { rut, contrasena } = req.body;

  try {
    const [usuarios] = await pool.query(
      `SELECT nombre, apellido, rol, email, rut FROM funcionarias where rut like ? AND contrasena like ? AND activo = true`,
      [rut, contrasena]
    );
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Algo salio muy mal",
    });
  }
};

//para obtener todos los usuarios de la tabla
export const obtenerUsuarios = async (req, res) => {
  let objeto = {rol:[],
                usuarios:[]}
  try {
    [objeto.usuarios] = await pool.query(
      `SELECT rut, nombre, apellido, rol, fechaIngreso, fechaNaci, especialidad, banco, ncuenta, email, activo FROM funcionarias WHERE activo = true order by apellido`
    );
    [objeto.rol] = await pool.query(
      `SELECT rol, COUNT(rol) as cantidad FROM funcionarias GROUP BY rol`
    );
    res.send(objeto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Algo salio muy mal",
    });
  }
};

//Para crear usuarios nuevos
export const crearUsuario = async (req, res) => {
  console.log("Solicitud recibida:", req.body);
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      rut,
      nombre,
      apellido,
      rol,
      dateInicio,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      email,
      contrasena,
    } = req.body;

    // Validar el formato del RUT chileno utilizando una expresión regular
    if (!/^([0-9]{7,8})-[0-9kK]$/.test(rut)) {
      return res.status(400).json({ mensaje: "El RUT ingresado no es válido" });
    }

    /*     // Validar el formato del email electrónico utilizando una expresión regular
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res
        .status(400)
        .json({ mensaje: "El email electrónico ingresado no es válido" });
    } */

    const fechaIngresoFormateada = moment(dateInicio).format("YYYY-MM-DD");
    
    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql =
      "INSERT INTO funcionarias (rut, nombre, apellido, rol, fechaIngreso, fechaNaci, especialidad, banco, ncuenta, email, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Ejecutar la consulta utilizando el pool de pooles
    await pool.query(sql, [
      rut,
      nombre,
      apellido,
      rol,
      fechaIngresoFormateada,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      email,
      contrasena,
    ]);
    res.status(200).json("Usuario ingresado con éxito");
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

//MODIFICAR USUARIO
export const modificarUsuario = async (req, res) => {
  console.log("Solicitud recibida:", req.body);
  try {
    // Obtener el rut del usuario a modificar desde los parámetros de la solicitud
    const { rut } = req.params;

    // Obtener los datos del cuerpo de la solicitud
    const {
      nombre,
      apellido,
      rol,
      dateInicio,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      email,
    } = req.body;

    // Crear una consulta SQL utilizando placeholders para evitar SQL injection
    const sql =
      "UPDATE funcionarias SET nombre = ?, apellido = ?, rol = ?, fechaIngreso = ?, fechaNaci = ?, especialidad = ?, banco = ?, ncuenta = ?, email = ? WHERE rut = ?";

    // Formatear la fecha de ingreso
    const fechaIngresoFormateada = moment(dateInicio).format("YYYY-MM-DD");

    console.log("Valores a insertar:", [
      nombre,
      apellido,
      rol,
      fechaIngresoFormateada,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      email,
    ]);

    // Ejecutar la consulta utilizando el pool de pooles
    await pool.query(sql, [
      nombre,
      apellido,
      rol,
      fechaIngresoFormateada,
      fechaNaci,
      especialidad,
      banco,
      ncuenta,
      email,
      rut,
    ]);
    res.status(200).json("Usuario modificado con éxito");
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

//BORRAR LOGICAMENTE AL USUARIO POR RUT
export const borrarUsuario = async (req, res) => {
  try {
    const { rut } = req.params;

    // Verificar si el usuario existe
    const [resultado] = await pool.query(
      "SELECT * FROM funcionarias WHERE rut = ?",
      [rut]
    );

    if (resultado.length === 0) {
      // Si el usuario no existe, devolver un error 404
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Actualizar el estado del usuario
    const [resultadoUpdate] = await pool.query(
      "UPDATE funcionarias SET activo = false WHERE rut = ?",
      [rut]
    );

    // Devolver la cantidad de registros actualizados
    res.json({ registrosActualizados: resultadoUpdate.affectedRows });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
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

    // Ejecutar la consulta utilizando el pool de pooles
    const [resultado] = await pool.query(sql, [rut]);

    // Devolver una respuesta con el número de registros actualizados
    res.json({ registrosActualizados: resultado.affectedRows });
  } catch (error) {
    // Devolver una respuesta con el error
    res.status(500).json({ error: error.message });
  }
};

