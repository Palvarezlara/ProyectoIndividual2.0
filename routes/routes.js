import { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import PassportLocal from "passport-local";
import mysql from "mysql";
import session from "express-session";
import cookieParser from "cookie-parser";
const router = Router()
const PassPortLocal = PassportLocal.Strategy // para crear la estrategia de auntenticacion 

dotenv.config()

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS

});

conexion.connect((error)=>{
if(error){
    throw error
}else{
    console.log("conexion exitosa")
}
});
//configurar cookie-parser
router.use(cookieParser("secretKey"))

// configurar session
router.use(session({
    secret: "secretKey",
    saveUninitialized: true,
    resave: true
}))

//---- configurar passport
router.use(passport.initialize())
router.use(passport.session())

//----estrategia para hacer el login
passport.use(new PassPortLocal(function(username, password, done){

    conexion.query(`SELECT correo, idusuario, clave from usuario where correo like '${username}'`, (error, res, fields)=>{
        if(error){
            throw error
        }else {
            if(res.length >0){
                let us = res[0]
                if(username == us.correo && password == us.clave){

                    return done(null,{id: us.idusuario, name: us.correo})
                }
            }
            
            return done (null,false)
        }
    })
}))

passport.serializeUser(function(user,done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user)
})




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

router.post("/login1", passport.authenticate("local", {failureRedirect: "/login"}),
                (req, res)=>{
                    res.render("perfil")
})



export default router