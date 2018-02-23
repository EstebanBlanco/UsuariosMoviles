angular.module('appModule',["ngRoute"])
    .config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "Views/login.html",
            controller: "loginController"
        })
        .when('/login', {
            templateUrl: "Views/login.html"
        })
        .when('/home',{
            templateUrl: "Views/home.html"
        })
        .when('/registro_estudiantes', {
            templateUrl: "Views/registration_student.html"
        })
        .when('/registro_asistente', {
            templateUrl: "Views/secretary.html"
        })
        .when('/registro_funcionarios', {
            templateUrl: "Views/registration_official.html"
        })
        .otherwise({
            redirectTo: '/'
      });
}]);

