import pool from "../db/conexion.js";


//CREAR SERVICIO NUEVO DESDE EL PERFIL TERAPEUTA
export const crearComision = async (req, res) => {
    console.log("Solicitud recibida:", req.body);
    try {
      // Obtener los datos del cuerpo de la solicitud
      const {
            fecha,
            comanda,
            rut,
            idservicios
       }=req.body;

      // Crear una consulta SQL utilizando placeholders para evitar SQL injection
      const sql =
        "INSERT INTO bd_comisiones (fecha, comanda, rut, idservicios ) VALUES (?, ?, ?, ?)";

      // Ejecutar la consulta utilizando el pool de pooles
      await pool.query(sql, [
        fecha,
        comanda,
        rut,
        idservicios
      ]);
      res.status(200).json("comanda ingresada con éxito");
    } catch (error) {
      // Devolver una respuesta con el error
      res.status(500).json({ error: error.message });
    }
  };

//CREAR HORARIO DE TURNO DESDE HORARIOS

//CREAR SERVICIO NUEVO DESDE EL REPORTE MODAL

//OBTENER LOS SERVICIOS PARA MOSTRAR EN LA TABLA

//EDITAR LOS SERVICIOS A TRAVES DE MODAL