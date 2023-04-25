import express from "express";
import cors from "cors";
import { usuarioRoutes } from "./routes/usuarioRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);

app.listem(4000, () => {
  console.log("api corriendo en puerto 4000");
});
