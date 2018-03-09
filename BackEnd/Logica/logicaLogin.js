//Va al pedido a la bases de datos.
var sqlConect = require('../ConexionDBs/query.js');
var jwt = require('../node_modules/jwt-simple');
var moment = require('../node_modules/moment');
var config = require('../Autenticacion/config');

//revisa el nombre y la contraseña del usuario.
exports.revisarLogin = function revisarLogin(sesion, callback) {
    sqlConect.getUserLogin(sesion.body, function(resultado) {
        if (resultado.success){
        console.log(resultado.message)
           sqlConect.getUserHeadquarter(sesion.body.username, function(sedesResultado) {
                //console.log(sedesResultado.data.length)

                if (sedesResultado.data.length == 1) { // La petición genera un JSON basura adicional que viene vacío. La lista nunca viene vacía
                    callback({
                        success: false,
                        data: [],
                        message: resultado.message,
                        msgCode: 400
                    })
                } 
                else {
                    sedesResultado.data.pop() // Sacar JSON basura, solucion temporal

                    sqlConect.getUserApps(sesion.body.username, function(appsResultado) {

                        listaApps = [];

                        if (appsResultado.data.length > 1) { // La petición genera un JSON adicional que viene vacío. La lista nunca viene vacía
                           listaApps = appsResultado.data
                           listaApps.pop() // Sacar JSON basura, solucion temporal
                        } 

                        // Se hace efectiva la creacion del token una vez encontrado el usuario y su sede

                        var payload = {
                            sub: resultado.data[0].username,
                            iat: moment().unix(),
                            exp: moment().add(14, "days").unix(),
                        };
                        var token = jwt.encode(payload, config.TOKEN_SECRET);
                        callback({
                            success: true,
                            data: { 'token': token, 'userData': resultado.data[0]},
                            message: resultado.message,
                            msgCode: 200,
                            sedes: sedesResultado.data,
                            apps: listaApps
                        })
                    });

                    
                }
            });
        }
        else{
            callback({
                success: false,
                data: resultado.message,
                message: 400
            })       
        }
        // if (resultado.data.length - 1 == 0) {
        //     console.log("Usuario no existe")
        //     callback({
        //         success: false,
        //         data: "El usuario digitado no existe.",
        //         message: 400
        //     })
        // } else {
        //     if (sesion.body.password == resultado.data[0].pass) {
        //         console.log("Correcto")
        //         sqlConect.getUserHeadquarter(sesion.body.username, function(sedesResultado) {
        //             console.log(sedesResultado)

        //             if (sedesResultado.data.length == 0) {
        //                 console.log("Usuario no esta en ninguna sede")
        //                 callback({
        //                     success: false,
        //                     data: "Usuario no esta en ninguna sede.",
        //                     message: 400
        //                 })
        //             } else {
        //                 // Se hace efectiva la creacion del token una vez encontrado el usuario y su sede

        //                 var payload = {
        //                     sub: resultado.data[0].username,
        //                     iat: moment().unix(),
        //                     exp: moment().add(14, "days").unix(),
        //                 };
        //                 var token = jwt.encode(payload, config.TOKEN_SECRET);
        //                 callback({
        //                     success: true,
        //                     data: { 'token': token, 'usuario': resultado.data[0].ID, 'nombre': resultado.data[0].nombre,
        //                      'apellido1': resultado.data[0].apellido1, 'apellido2':resultado.data[0].apellido2},
        //                     message: 200,
        //                     sedes: sedesResultado.data
        //                 })

        //             }

        //         });


        //     } else {
        //         console.log("Contraseñas no coinciden")
        //         callback({
        //             success: false,
        //             data: "La contraseña digitada no es correcta.",
        //             message: 400
        //         })
        //     }
        // }
    });

}