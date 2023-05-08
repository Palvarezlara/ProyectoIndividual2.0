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
        } = req.body;

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
//PARA OBTENER TODOS LOS SERVICIOS DE LA TABLA
export const obtenerComanda = async (req, res) => {
    let objeto
    let {rut }= req.params;
    try {
        [objeto] = await pool.query(
            `SELECT f.rut, f.nombre, f.apellido, bd.fecha, bd.comanda, te.nombreTerapia, te.comision
        FROM funcionarias as f
        INNER JOIN bd_comisiones as bd ON (f.rut = bd.rut)
        INNER JOIN terapias as te ON (bd.idservicios = te.idservicios)
        WHERE f.rut = ?`, [rut]
        );
        res.send(objeto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: "Algo salio muy mal",
        });
    }
};


//CREAR HORARIO DE TURNO DESDE HORARIOS

//CREAR SERVICIO NUEVO DESDE EL REPORTE MODAL

//OBTENER LOS SERVICIOS PARA MOSTRAR EN LA TABLA

//EDITAR LOS SERVICIOS A TRAVES DE MODAL