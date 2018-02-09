//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("appModule",['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "templates/secretary.html"
        })
        .when('/home',{
            templateUrl: "templates/home.html",
        })
        .when('/registro_estudiantes', {
            templateUrl: "templates/registration_student.html"
        })
        .when('/registro_asistente', {
            templateUrl: "templates/secretary.html"
        })
        .when('/registro_funcionarios', {
            templateUrl: "templates/registration_official.html"
        })
        .otherwise({
            redirectTo: '/'
      });
}]);

