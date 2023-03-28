import { Router } from "express";
import bodyParser from "body-parser";
//import mysql from "mysql";
const router = Router()
// const conexion = mysql.createConnection({
// host: 'localhost',
// database: 'usuario',
// user: 'root',
// password:'123456789'
// });

// conexion.connect(function(error){
//     if(erros){
//         throw error;
        
//     }else{
//         console.log('conexion exitosa')
//     }
// })
// conexion.end()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
router.get("/", (req,res) =>{
    res.render("home")
})

router.get("/home", (req,res)=>{
    res.render("home")
})

router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/perfil", (req,res) =>{
    res.render("perfil")
})

router.post("/login1", (req, res)=>{
    console.log("cualquier cosa")
})

router.get("/formulario", (req,res)=>{
    res.render("formulario")
})

export default router