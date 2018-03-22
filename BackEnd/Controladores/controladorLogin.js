var logicaLogin = require('../Logica/logicaLogin.js');

exports.login = function(rRequest, rResponse) {
	logicaLogin.revisarLogin(rRequest, function(data) {
		rResponse.send(data);
    });
};