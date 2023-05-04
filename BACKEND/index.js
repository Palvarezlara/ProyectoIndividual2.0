import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import terapiasRoutes from "./routes/terapiasRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);
app.use(terapiasRoutes);


app.listen(4000, () => {
  console.log("api corriendo en puerto 4000");
});
