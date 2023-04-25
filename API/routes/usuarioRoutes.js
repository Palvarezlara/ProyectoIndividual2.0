import { Router } from "express";
import {
  borrarUsuario,
  crearUsuario,
  modificarUsuario,
  obtenerUsuarios,
  reactivarUsuario,
} from "../controllers/usuarioControllers.js";

const router = Router();

router.get("/obtenerUsuarios", obtenerUsuarios);
router.post("/crearUsuario", crearUsuario);
router.put("/modificarUsuario", modificarUsuario);
router.delete("/borrarUsuario", borrarUsuario);
router.put("/reactivarUsuario", reactivarUsuario);

export default router;
