var app = angular.module('appModule',["ngRoute","ngResource"])
    .controller('registrationOfficialController', function($scope, $http, $location,$window) {

        // modelo de datos.
        $scope.username = "";
        $scope.password = "";

        $scope.registration = function () {
            window.location.href = "#/main";
        }

    });