import { Router } from "express";
import {
    crearComision
  } from "../controllers/terapiasControllers.js";

  const router = Router();
  router.post("/api/crearComision", crearComision);

  export default router;