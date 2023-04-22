import { Router } from "express";
import {crearUsuario, obtenerUsuarios} from "../controllers/usuarioControllers.js"

const router = Router();

router.get("/obtenerUsuarios", obtenerUsuarios);
router.post("/crearUsuario", crearUsuario);

export default router;