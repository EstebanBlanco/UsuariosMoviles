var sqlConect = require('../ConexionDBs/query.js');

//revisa el nombre y la contraseña del usuario.
exports.obtenerInfoEstudiante = function obtenerInfoEstudiante(data, callback) {
    sqlConect.getInfoEstudiante(data.cedula, data.codigoPeticion, function(resultado) { //Colocar un codigo de peticion para saber que App solicita el dato, y asi variar lo que se retorna
        if (resultado.success){
            console.log(resultado.message)
            
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