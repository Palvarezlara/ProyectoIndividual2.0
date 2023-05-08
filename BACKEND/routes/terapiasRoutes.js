import { Router } from "express";
import {
    crearComision, obtenerComanda
  } from "../controllers/terapiasControllers.js";

  const router = Router();
  router.post("/api/crearComision", crearComision);
  router.get("/api/obtenerComanda/:rut", obtenerComanda);
  export default router;