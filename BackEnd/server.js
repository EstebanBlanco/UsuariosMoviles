/* Archivos donde estan los controladores en el servidor. */
//Controlador del login en el servidor.
var loginCtrl = require('./Controladores/controladorLogin');

//Controlador del m�dulo de registro
var registroCtrl = require('./Controladores/controladorRegistro');

//Controlador del módulo de personas
var gestionInfoCtrl = require('./Controladores/controladorGestionInfo');

//Controlador del módulo de registro de funcionarios desde secretaria
var preregistroSecretaryCtrl = require('./Controladores/controladorPreregistroSecretary'); //controladorPreregistroSecretary

/****************************************************************/
//Configuraci�n del servidor.
bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Middleware utilizado para generar el token y validarlo
var middleware = require('./Autenticacion/middleware');
//Se direccionan las vistas. EL mismos server levantar las vistas.
app.use('/', express.static(__dirname + '/../Front-end'));


/****************************************************************/
//Inicio de las direcciones. Endpoints!

//Endpoint de inicio de sesi�n y creaci�n de token
app.post('/login', loginCtrl.login);

//Endpoint de registro de nuevo usuario
app.put('/registroEstudiante', registroCtrl.regEstudiante);
app.put('/registroSecretaria', registroCtrl.regSecretaria);
app.put('/registroFuncionario', registroCtrl.regFuncionario);
app.put('/preregistroSecretaryCtrl',preregistroSecretaryCtrl.preRegFuncionario);
//app.get('/getDepartmentPerson/:idP',registroCtrl.obtenerDepartamentoPersona);
//app.post('/setPersonToDepartment/:idP/:nombreDep',registroCtrl.asignarPersonaDepartamento);
//app.post('/cambiarContra/:newPass/:idP',registroCtrl.cambiarContrasena);
//app.post('/insertarDepartamento',registroCtrl.insertarDepartamento);
//app.get('/getSedes',registroCtrl.obtenerSedes);
//app.get('/getDepartamentBySede',registroCtrl.obtenerDepartamentoPorSede);

//Endpoints App Devesa
app.post('/obtenerInfoEstudiante', gestionInfoCtrl.obtenerInfoEstudiante);

//Pone el servidor en escucha de peticiones,lo levanta en el puerto requerido.
server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});