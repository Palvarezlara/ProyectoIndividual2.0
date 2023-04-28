import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);

app.listen(4000, () => {
  console.log("api corriendo en puerto 4000");
});