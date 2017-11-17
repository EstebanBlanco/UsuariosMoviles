//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("appModule",['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "templates/registration.html"
        })
        .when('/home',{
            templateUrl: "templates/home.html"
        })
        .when('/register', {
            templateUrl: "templates/registration.html",
            controller: "loginController"
        })
        .when('/secretary', {
            templateUrl: "templates/secretary.html",
            controller: "loginController"
        })
        .otherwise({
            redirectTo: '/'
      });
}]);

