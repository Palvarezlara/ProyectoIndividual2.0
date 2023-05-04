import { Router } from "express";
import {
    crearComision, obtenerComanda
  } from "../controllers/terapiasControllers.js";

  const router = Router();
  router.post("/api/crearComision", crearComision);
  router.post("/api/obtenerComanda", obtenerComanda);
  export default router;