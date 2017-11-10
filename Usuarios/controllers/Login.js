var app = angular.module('appModule',["ngRoute","ngResource"])
    .controller('loginController', function($scope, $http, $location,$window) {

        // modelo de datos.
        $scope.username = "";
        $scope.password = "";

        $scope.registration = function () {
            window.location.href = "#/register";
        }

    });