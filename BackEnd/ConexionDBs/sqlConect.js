var Connection = require('tedious').Connection;
//Configuraciones de conección a la base de datos sql server.

var config = {
    userName: 'infotec',
    password: '_1Nf0t3c',
    server: '172.19.32.10',
    options: {
        database: 'infoTec',
        driver: 'SQL Server Native Client 11.0',
        rowCollectionOnDone: true
    }
};

//Crea la conexión, si todo sale bien no tira el mensaje de error en la consola.
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
});

exports.executeRequest = function(request, callback) {
    'use strict';
    var res = [],
        connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                message: err.code
            });
            return;
        }

        request.on('row', function(columns) {
            var row = {};
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    row[column.metadata.colName] = column.value;

                }
            });
            res.push(row);
        });
        request.on('done', function(rowCount, more, rows) {
            console.log("colocho" + rowCount + more + rows);

        });

        request.on('returnValue', function(parameterName, value, metadata) {
            connection.close();
            if (parameterName === 'iStatus' && value === 0) {
                callback({
                    success: true,
                    data: res,
                    message: 200
                });
            } else if (parameterName === 'iStatus') {
                callback({
                    success: false,
                    data: res,
                    message: 400
                });
            }
        });
        connection.execSql(request);
    });
};

//exports.executeRequest;

exports.callProcedure = function(request, callback) {
    'use strict';
    var response = {};
    response.data = [],

        connection = new Connection(config);

        connection.on('connect', function(err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                error: "Hubo un problema con la conexión"
            });
        }

        request.on('row', function(columns) {
            var row = {};
            columns.forEach(function(column) {
                if (column.value === null) {
                    //console.log('NULL');
                } else {
                    row[column.metadata.colName] = column.value;
                }
            });
            response.data.push(row);
        });

        request.on('returnValue', function(parameterName, value, metadata) {
            connection.close();
            console.log("Return Value");
            if (parameterName === 'success') {
                response.success = value;
                // callback({
                //     success: true,
                //     data: res
                // });  
            } 
            else if (parameterName === 'message') {
                response.message = value;
            } 
            else {
                response.success = false;
            };
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log("DoneProc");
            callback(
                response
            );
         });

        connection.callProcedure(request);
    });
};