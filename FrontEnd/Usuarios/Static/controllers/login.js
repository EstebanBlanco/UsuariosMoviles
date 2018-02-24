var app = angular.module('appModule')
    .controller('loginCtrl', function($scope, $http, $location, $window) {
        $scope.formDataLogin = {};

        $scope.studentRegistration = function () {
                console.log($scope.formDataLogin.username);
        };

        $scope.login = function () {

        };
    });