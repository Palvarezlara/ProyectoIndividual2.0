# ProyectoIndividual
Proyecto Personal Bootcamp

Este proyecto consiste en una aplicación web enfocada en un centro de masajes, en el cual existe un usuario terapeuta que requiere ingresar las terapias que realiza en su turno, además de su horario de entrada y salida, este podrá visualizar una tabla con todas sus comandas.
Un usuario Administrador que podrá crear usuarios nuevos, modificar, borrar y generar un reporte de estos. 

Puesta en marcha

1° 	Tener en consideración que este proyecto hace uso de API, implementada en este repositorio en la carpeta Backend: ProyectoIndividual2.0 	 	
 	
2° 	Luego de descargar el repositorio, instalar los paquetes necesarios mediante el comando (sin comillas): "npm i "
 	
3° 	Para iniciar la aplicación en visual Studio Code debe abrir dos ventanas diferentes para cada carpeta, con el siguiente comando (sin comillas): 	"nodemon server.js " para la carpeta proyecto y “nodemon index.js” para la carpeta Backend. 
 	
4° 	Este proyecto usa MySQL como base de datos. Se adjuntan los script para la creación de las tablas e ingreso de información de usuarios, se deben cambiar los datos de conexión de la base de dato en la carpeta .env en el Backend y en la carpeta DB conexion.js . 

5°  En el navegador ir a la dirección: http://localhost:3000

6°  Una vez creada la base de datos, el usuario con rol Admin para entrar es el siguiente:
usuario: 16233794-7
contraseña: 12345

Para fines prácticos de demostración se agregaron los archivos .env de los respectivos proyectos

Rúbrica:
Links donde encontrar ejemplos de los aspectos a evaluar:
Consulta a la base de datos
	
Selección 	de columnas requeridas para presentar la información 	solicitada: BACKEND: 	controllers/usuarioControllers.js
 	
Uso 	de JOIN para relacionar la información de distintas 	tablas: BACKEND: 	controllers/terapiasControllers.js
 	
Uso 	de WHERE para filtrar la información requerida: BACKEND: 	controllers/terapiasControllers.js
 	
Uso 	de cláusulas de ordenamiento para presentar la 	información: BACKEND: 	controllers/usuarioControllers.js
 	
Uso 	de cláusulas de agrupación de información para obtener datos 	agregados: BACKEND: 	controllers/usuarioControllers.js

Algorítmo de cálculo y manipulación de archivos de texto
	
Uso 	general del lenguaje, sintáxis, selección de tipos de dato, sentencias lógicas, expresiones, operaciones y comparaciones: 	Ejemplos: 1 , 2
 	
Uso 	de sentencias repetitivas: PROYECTO/api/apiTerapias.js:78, PROYECTO/api/apiUsuarios.js:68,  PROYECTO/api/apiUsuarios.js:101, PROYECTO/public/src/js/descarArchivos.js:11, 
 	
Convenciones 	y estilos de programación: PROYECTO/routes/routes.js
 	
Utilización 	correcta de estructuras de datos: PROYECTO/routes/routes.js
 	
Manipulación 	de archivos: 	Frontend: http://localhost:3000/mantenedor: PROYECTO: 	public/src/js/descargarArchivos.js Descarga un archivo excel con la tabla de usuarios. PROYECTO/views/mantenedor.hbs:51


Página Web y HTML
	
Uso 	de tags html, estilos y responsividad - Uso de 	Bootstrap: PROYECTO/views/mantenedor.hbs, PROYECTO/views/reporteTerap.hbs 	/views en esta carpeta se encuentran los archivos HBS donde se implementa 	HTML y Bootstrap


Lenguaje Node
	
Inclusión 	de paquetes y librerías de 	usuario: PROYECTO 	package.json , BACKEND 	package.json, Ejemplo 	en código
 	
Agrupación 	del código y separación por funcionalidad: En la siguiente carpeta 	se encuentran distintas funcionalidades separadas en archivos y funciones public/src/js
 	
Utilización 	de funciones asíncronas: PROYECTO/routes/routes.js, PROYECTO/api/apiUsuarios.js,  BACKEND/controllers/usuarioControllers.js
 	
Lectura 	de parámetros de entrada: Proyecto/apiUsuarios.js Frontend: http://localhost:3000/mantenedor crear usuario nuevo y editar	


Conexión a Base de Datos
	
Manejo 	de conexión a base de datos desde Node: BACKEND/db/conexion.js
 	
Manejo 	y ejecución de consultas desde Node: BACKEND/controllers/usuarioControllers.js, BACKEND/controllers/terapiaControllers.js

Uso de Express
	
Creación 	servicio Rest con Express: BACKEND





