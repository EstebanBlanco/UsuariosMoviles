var sqlConect = require('../ConexionDBs/query.js');

//revisa el nombre y la contraseña del usuario.
exports.getInfoEstudianteAppDevesa = function getInfoEstudianteAppDevesa(data, callback) {
    sqlConect.getUserLogin(data.cedula, function(resultado) {
        if (resultado.success){
            console.log(resultado.message)
            callback({
                success: true,
                data: resultado.info,
                message: resultado.message,
                msgCode: 200,
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