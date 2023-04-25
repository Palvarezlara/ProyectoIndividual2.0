import { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import PassportLocal from "passport-local";
//import mysql from "mysql";
import mysql from "mysql2";
import session from "express-session";
import cookieParser from "cookie-parser";
const router = Router()
const PassPortLocal = PassportLocal.Strategy // para crear la estrategia de auntenticacion 

dotenv.config()


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

    conexion.query(`select rut, nombre, apellido, cargo, contrasena
    from funcionarias 
    where rut like'${username}'`, (error, res, fields)=>{
        if(error){
            throw error
        }else {
            if(res.length >0){
                let us = res[0]
                
                if(username == us.rut && password == us.contrasena){

                    return done(null,{id: us.rut, correo: us.correo, name: us.nombre, apellido: us.apellido, cargo: us.cargo })
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
    res.render("login")
})

router.get("/home", (req,res)=>{
    res.render("home")
})

router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/crearUsuario", (req,res)=>{
    res.render("crearUsuario")
})
router.post("/terapias",(req,res)=>{
    console.log(req.body)
    res.render("perfil")
})

router.post("/save",(req,res)=>{
    console.log(req.body)
    res.render("mantenedor")
})

router.post("/login1", passport.authenticate("local", {failureRedirect: "/login"}),
                (req, res)=>{
                    let nombre = req.session.passport.user.name
                    res.render("perfil", {nombre})
                    
})

router.get("/perfil", (req,res) =>{
    res.render("perfil")
})

router.get("/reportes", (req,res) =>{
    res.render("reportes")
})
router.get("/manualrecep", (req,res)=>{
    res.render("manualrecep")
})

router.get("/manualterap", (req,res)=>{
    res.render("manualterap")
})

router.get("/mantenedor", (req,res)=>{
    res.render("mantenedor")
})
export default router