import express from "express";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import indexRoutes from "./routes/routes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import * as helpers from "./utils/helpers/hbs.js";
import hbs from "hbs";
import cors from "cors";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
hbs.registerPartials(join(__dirname,"/views/partials"));
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(usuarioRoutes);
app.set('view engine', 'hbs');
app.set('views' , './views');
app.use(express.static("public"));


app.listen(3000, function(){
    console.log("servidor en puerto 3000")
});