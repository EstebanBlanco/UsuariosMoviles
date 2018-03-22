var sqlConect = require('../ConexionDBs/query.js');
var crypto = require("crypto");

exports.registroPorSecretaria = function registroPorSecretaria(datos, callback) {
    var pass = crypto.randomBytes(10).toString('hex');
    datos.body.pass = pass;
    sqlConect.postFuncSecretaryUser(datos.body, function(resultado) {
        //console.log(datos.body)
        console.log(resultado)
        if (resultado.success){
            // texto = "";
            // for (rol in datos.body.listaRoles){
            //     texto += datos.body.listaRoles[rol]
            // }
            // console.log(texto)
            callback({
                success: true,
                data: pass,
                message: resultado.message,
                msgCode: 200
            })
        }
        else{
            callback({
                success: false,
                message: resultado.message,
                msgCode: 400
            })
        }
        
    });
}

exports.registroFuncionario = function registroFuncionario(datos, callback) {
    sqlConect.postFuncUser(datos.body, function(resultado) {
        //console.log(datos.body)
        if (resultado.success){

            // Asociar cada uno de los roles solicitados al funcionario.
            // console.log(datos.body.listaRoles.length)
            // for (rol in datos.body.listaRoles){
            //     sqlConect.postRolToFuncUser(datos.body.idPersona,  datos.body.listaRoles[rol], function(resultado) {
            //         console.log(resultado)
            //         if (resultado.success){
            //             contadorRoles ++;
            //         }
            //         else{
            //             callback({
            //                 success: false,
            //                 data: "Ocurrió un error al asociar un rol al usuario.",
            //                 message: 400
            //             })
            //         }
            //     });
            // }

            // // Asociar cada una de las licencias solicitadas al funcionario.
            // console.log(datos.body.listaLicencias)
            
            // for (lic in datos.body.listaLicencias){
            //     sqlConect.postLicenseToFuncUser(datos.body.idPersona,  datos.body.listaLicencias[lic], function(resultado) {
            //         console.log(resultado)
            //         if (resultado.success){
            //             contadorLics ++;
            //         }
            //         else{
            //             callback({
            //                 success: false,
            //                 data: "Ocurrió un error al asociar una licencia al usuario.",
            //                 message: 400
            //             })
            //         }
            //     });
            // }

            callback({
                success: true,
                message: resultado.message,
                msgCode: 200
            })
        }
        else{
            callback({
                success: false,
                error: resultado.data,
                message: resultado.message,
                msgCode: 400
            })
        }
        
    });

}

exports.registroEstudiante = function registroEstudiante(datos, callback) {
    console.log(datos);
    sqlConect.postStudentUser(datos.body, function(resultado) {
        console.log(resultado)
        if (resultado.success){
            callback({
                success: true,
                data: resultado.message,
                message: 200
            })
        }
        else{
            callback({
                success: false,
                data: resultado.message,
                message: 400
            })
        }
    });
}