var logicaRegistro = require('../Logica/logicaRegistro.js');

exports.regSecretaria = function(rRequest, rResponse) {
    logicaRegistro.registroPorSecretaria(rRequest, function(data) {
        rResponse.send(data);
    });
};

exports.regFuncionario = function(rRequest, rResponse) {
    logicaRegistro.registroFuncionario(rRequest, function(data) {
        rResponse.send(data);
    });
};

exports.regEstudiante = function(rRequest, rResponse) {
    logicaRegistro.registroEstudiante(rRequest, function(data) {
        rResponse.send(data);
    });
};