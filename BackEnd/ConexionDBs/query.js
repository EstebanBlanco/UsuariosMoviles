var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConect = require('./sqlConect.js');


// Login Procs
exports.getUserLogin = function getUserLogin(userCredentials, callback) {
    var request = new Request('obtenerPersona', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: 'Error',
                message: 'Error cargando los datos',
                type: 'error'
            });
        }
    });
    request.addParameter('cedula', TYPES.VarChar, userCredentials.username);
    request.addParameter('contrasena', TYPES.VarChar, userCredentials.password);
    request.addOutputParameter('success', TYPES.Bit);
    request.addOutputParameter('message', TYPES.VarChar);
    sqlConect.callProcedure(request, callback)
}

exports.getUserHeadquarter = function getUserHeadquarter(cedula, callback) {
    var request = new Request('obtenerSedesPersona', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: 'Error',
                message: 'Error cargando los datos',
                type: 'error'
            });
        }
    });

    request.addParameter('idPersona', TYPES.VarChar, cedula);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)

}

exports.getUserCareers = function getUserCareers(cedula, callback) {
    var request = new Request('obtenerCarrerasPersona', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: 'Error',
                message: 'Error cargando los datos',
                type: 'error'
            });
        }
    });

    request.addParameter('idPersona', TYPES.VarChar, cedula);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)
}

//Registro procs
exports.postFuncUser = function postFuncUser(userInfo, callback) {
    var request = new Request('insertarFuncionarioPersona', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('idPersona', TYPES.VarChar,userInfo.idPersona);
    request.addParameter('nombre', TYPES.VarChar,userInfo.nombre);
    request.addParameter('apellido1', TYPES.VarChar,userInfo.apellido1);
    request.addParameter('apellido2', TYPES.VarChar,userInfo.apellido2);
    request.addParameter('newpass', TYPES.VarChar,userInfo.newpass);
    request.addParameter('estadoCivil', TYPES.VarChar,userInfo.estadoCivil);
    request.addParameter('fechaNacimiento', TYPES.VarChar,userInfo.fechaNacimiento);
    request.addParameter('sexo', TYPES.Char,userInfo.sexo);
    request.addParameter('direccion', TYPES.VarChar,userInfo.direccion);
    request.addParameter('gradoAcademico', TYPES.VarChar,userInfo.gradoAcademico);
    request.addOutputParameter('success', TYPES.Bit);

    sqlConect.callProcedure(request, function(resultado){
        if (resultado.success){
            //Inserción de los roles y licencias de cada usuario
            var contadorRol = 0, contadorLics = 0;

            if (userInfo.listaRoles){
                contadorRol = userInfo.listaRoles.length;
                for (rol in userInfo.listaRoles){
                    var request = new Request('insertarRolFuncPersona', function(err) {
                        console.log(err)
                        if (err) {
                            callback({
                                success: false,
                                data: err,
                                error: request.error,
                                title: "Error",
                                message: "Sucedio un error en la inserción de los datos",
                                type: "error"
                            })
                        }
                    });
                
                    request.addParameter('idPersona', TYPES.VarChar, userInfo.idPersona);
                    request.addParameter('idRol', TYPES.Int, userInfo.listaRoles[rol]);
                    request.addOutputParameter('success', TYPES.Bit);
                    
                    sqlConect.callProcedure(request, function(resultadoRol){
                        // if (resultadoRol.success){
                        //     contadorRol ++;
                        // }
                    })
                }
            }

            if (userInfo.listaRoles){
                contadorLics = userInfo.listaLicencias.length;
                for (lic in userInfo.listaLicencias){
                    var request = new Request('insertarLicenciaFuncPersona', function(err) {
                        console.log(err)
                        if (err) {
                            callback({
                                success: false,
                                data: err,
                                error: request.error,
                                title: "Error",
                                message: "Sucedio un error en la inserción de los datos. Verifique la conexión.",
                                type: "error"
                            })
                        }
                    });
                
                    request.addParameter('idPersona', TYPES.VarChar, userInfo.idPersona);
                    request.addParameter('idLicencia', TYPES.Int, userInfo.listaLicencias[lic]);
                    request.addOutputParameter('success', TYPES.Bit);
    
                    sqlConect.callProcedure(request, function(resultadoLicencias){
                        // if (resultadoLicencias.success){
                        //     contadorLics++;
                        // }
                    })
                }
            }

            // Se asume éxito, ya que no puede controlarse por ser Async
            callback({
                success: true,
                title: "Success",
                message: "La inserción de los datos se concretó de manera exitosa. Se asoció a " +contadorRol+ " roles y " + contadorLics + " licencias."
            })

            // if (contadorRol == userInfo.listaRoles.length && contadorLics == userInfo.listaLicencias.length){
            //     callback({
            //         success: true,
            //         title: "Success",
            //         message: "La inserción de los datos se concretó de manera exitosa. Se asoció a " +contadorRol+ " roles y " + contadorLics + " licencias."
            //     })
            // }
            // else{
            //     callback({
            //         success: false,
            //         title: "Error",
            //         message: "Algunos datos no se pudieron insertar. Verifique que no se hayan seleccionado datos ya existentes en el sistema.",
            //     })
            // }

            
        }
        else{
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la actualización de los datos del usuario. Los roles y licencias no fueron insertados",
                type: "error"
            })
        }
    })

}

exports.postFuncSecretaryUser = function postFuncSecretaryUser(userInfo, callback) {
    console.log(userInfo)
    var request = new Request('insertarFuncPersonaPorSecre', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('idPersona', TYPES.VarChar, userInfo.idPersona);
    request.addParameter('pass', TYPES.VarChar,userInfo.pass);
    request.addParameter('correo', TYPES.VarChar,userInfo.correo);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function(resultado){
        if (resultado.success){
            callback({
                success: true,
                title: "Success",
                message: "El usuario se insertó de manera exitosa."
            })
        }
        else{
            callback({
                success: false,
                data: resultado,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción del usuario.",
                type: "error"
            })
        }
    })
}



// exports.postRolToFuncUser = function postRolToFuncUser(idPersona, idRol, callback) {
//     var request = new Request('insertarRolFuncPersona', function(err) {
//         console.log(err)
//         if (err) {
//             callback({
//                 success: false,
//                 data: err,
//                 error: request.error,
//                 title: "Error",
//                 message: "Sucedio un error en la inserción de los datos",
//                 type: "error"
//             })
//         }
//     });

//     request.addParameter('idPersona', TYPES.VarChar, idPersona);
//     request.addParameter('idRol', TYPES.Int, idRol);
//     request.addOutputParameter('success', TYPES.Bit);
//     sqlConect.callProcedure(request, callback)
// }

// exports.postLicenseToFuncUser = function postLicenseToFuncUser(idPersona, idLicencia, callback) {
//     var request = new Request('insertarLicenciaFuncPersona', function(err) {
//         console.log(err)
//         if (err) {
//             callback({
//                 success: false,
//                 data: err,
//                 error: request.error,
//                 title: "Error",
//                 message: "Sucedio un error en la inserción de los datos",
//                 type: "error"
//             })
//         }
//     });

//     request.addParameter('idPersona', TYPES.VarChar, idPersona);
//     request.addParameter('idLicencia', TYPES.Int, idLicencia);
//     request.addOutputParameter('success', TYPES.Bit);
//     sqlConect.callProcedure(request, callback)
// }

exports.postStudentUser = function postStudentUser(userInfo, callback) {
    console.log(userInfo)
    var request = new Request('insertarEstudiantePersona', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('idPersona', TYPES.VarChar,userInfo.idPersona);
    request.addParameter('nombre', TYPES.VarChar,userInfo.nombre);
    request.addParameter('apellido1', TYPES.VarChar,userInfo.apellido1);
    request.addParameter('apellido2', TYPES.VarChar,userInfo.apellido2);
    request.addParameter('pass', TYPES.VarChar,userInfo.pass);
    request.addParameter('correo', TYPES.VarChar,userInfo.correo);
    request.addParameter('carne', TYPES.VarChar,userInfo.carne);
    request.addParameter('estadoCivil', TYPES.VarChar,userInfo.estadoCivil);
    request.addParameter('fechaNacimiento', TYPES.VarChar,userInfo.fechaNacimiento);
    request.addParameter('sexo', TYPES.Char,userInfo.sexo);
    request.addParameter('direccion', TYPES.VarChar,userInfo.direccion);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function(resultado){
        if (resultado.success){
            callback({
                success: true,
                title: "Success",
                message: "El usuario se insertó de manera exitosa."
            })
        }
        else{
            callback({
                success: false,
                data: resultado,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción del usuario.",
                type: "error"
            })
        }
    })

}

//Devesa Procs
exports.getInfoEstudianteAppDevesa = function getInfoEstudianteAppDevesa(cedula, callback) {
    console.log(cedula)
    var request = new Request('obtenerInfoEstudianteAppDevesa', function(err) {
        console.log(err)
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error durante la obtención de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('cedula', TYPES.VarChar, cedula);
    request.addOutputParameter('success', TYPES.Bit);
    request.addOutputParameter('message', TYPES.VarChar);
    sqlConect.callProcedure(request, callback)
}
