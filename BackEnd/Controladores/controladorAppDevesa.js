var logicaAppDevesa = require('../Logica/logicaAppDevesa.js');

exports.infoDevesa = function(rRequest, rResponse) {
	logicaAppDevesa.getInfoEstudiante(rRequest, function(data) {
		rResponse.send(data);
    });
};