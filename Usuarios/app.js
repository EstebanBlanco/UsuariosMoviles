//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("appModule",['ngRoute','LocalStorageModule'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/home',{
            templateUrl: "templates/home.html"
        })
        .when('/', {
            templateUrl: "templates/login.html"
        })
        .otherwise({
            redirectTo: '/'
      });
}]);

