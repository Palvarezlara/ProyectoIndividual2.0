import { Router } from "express";
import {
  borrarUsuario,
  crearUsuario,
  modificarUsuario,
  obtenerUsuarios,
  reactivarUsuario,
  comprobarUsuario,
} from "../controllers/usuarioControllers.js";

const router = Router();

router.get("/api/obtenerUsuarios", obtenerUsuarios);
router.post("/api/crearUsuario", crearUsuario);
router.put("/api/modificarUsuario/:rut", modificarUsuario);
router.put("/api/borrarUsuario/:rut", borrarUsuario);
router.put("/api/reactivarUsuario", reactivarUsuario);
router.post("/api/comprobarUsuario", comprobarUsuario);

export default router;
