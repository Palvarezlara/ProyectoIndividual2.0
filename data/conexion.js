import { createPool } from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();
export const conexion = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS

});