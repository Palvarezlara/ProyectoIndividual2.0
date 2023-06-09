import { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import PassportLocal from "passport-local";
//import mysql from "mysql";
import mysql from "mysql2";
import session from "express-session";
import cookieParser from "cookie-parser";
import swal from "sweetalert2";

const router = Router();
const PassPortLocal = PassportLocal.Strategy; // para crear la estrategia de auntenticacion

dotenv.config();

//configurar cookie-parser
router.use(cookieParser("secretKey"));

// configurar session
router.use(
  session({
    secret: "secretKey",
    saveUninitialized: true,
    resave: true,
  })
);

//---- configurar passport
router.use(passport.initialize());
router.use(passport.session());

//----estrategia para hacer el login de ir en la API OJO
passport.use(
  new PassPortLocal(async function (username, password, done) {
    const comprobacion = await fetch(
      "http://localhost:4000/api/comprobarUsuario",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rut: username,
          contrasena: password,
        }),
      }
    );
    let data = await comprobacion.json();
    const us = data[0];
    console.log(data.length);
    if (data.length === 0) {
      return done(null, false, { Mensaje: "Usuario incorrecto" });
    } else {
      return done(null, {
        id: us.rut,
        email: us.email,
        name: us.nombre,
        apellido: us.apellido,
        rol: us.rol,
      });
    }
  })
);

//guardar los datos de usuario
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// --------------------------Ruta de inicio al login---------------------------------
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login1",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    let nombre = req.session.passport.user.name;
    res.render("home", { nombre });
  }
);

// ------------------------Con cliente identificado pasa a Home--------------------
router.get("/home", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    res.render("home", { nombre });
  } else {
    res.render("login");
  }
});

// -------------------------Aciones para enviar formularios-----------------
router.post("/terapias", (req, res) => {
  console.log(req.body);
  res.render("perfil");
});

router.post("/save", (req, res) => {
  console.log(req.body);
  res.render("mantenedor");
});

//-------------Ingreso a página donde ingresa las comandas--------------------
router.get("/perfil", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    let rut = req.session.passport.user.id
    res.render("perfil", { nombre, rut });
  } else {
    res.render("login");
  }
});
//--------------Segundo menú-------------------------
router.get("/reportes", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    res.render("reportes", { nombre });
  } else {
    res.render("login");
  }
});
// -------------Tabla con el reporte de todas las comandas---------------------
router.get("/reporteTerap", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    let rut = req.session.passport.user.id
    res.render("reporteTerap", { nombre, rut });
  } else {
    res.render("login");
  }
});
//-------------Página donde ingresan horario de entrada no terminado-------
router.get("/horario", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    res.render("horario", { nombre });
  } else {
    res.render("login");
  }
});

router.get("/manualterap", (req, res, next) => {
  if (req.isAuthenticated()) {
    let nombre = req.session.passport.user.name;
    res.render("manualterap", { nombre });
  } else {
    res.render("login");
  }
});

//Función para filtrar los usuarios del Admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.session.passport.user.rol === "Admin") {
    return next();
  } else {
    res.render("login")
  }
}
router.get("/mantenedor", isAdmin, (req, res) => {
  console.log(req.body);
  res.render("mantenedor");
});

//---------------Para volver al login desde la página---------------------
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.render('login');
  });

});
export default router;
