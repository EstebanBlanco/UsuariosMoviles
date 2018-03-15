angular.module('appModule',["ngRoute"])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider

            .when('/registro_funcionarios', {
                templateUrl: "Views/login.html",
                controller: "loginCtrl"
            })
            .when('/registro_estudiantes', {
                templateUrl: "Views/registration_student.html",
                controller: "studentCtrl"
            })
            .when('/registro_asistente', {
                templateUrl: "Views/secretary.html",
                controller: "secretaryCtrl"
            })
            .when('/admins_apps', {
                templateUrl: "Views/admins.html",
                controller: "adminsCtrl"
            })

            .when('/', {
                templateUrl: "Views/registration_official.html",
                controller: "officialCtrl"
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);