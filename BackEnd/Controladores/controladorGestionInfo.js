var logicaGestionInfo = require('../Logica/logicaGestionInfo.js');

exports.obtenerInfoEstudiante = function(rRequest, rResponse) {
	logicaGestionInfo.obtenerInfoEstudiante(rRequest, function(data) {
		rResponse.send(data);
    });
};