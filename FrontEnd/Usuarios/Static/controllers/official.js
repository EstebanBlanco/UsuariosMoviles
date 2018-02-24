var app = angular.module('appModule')
    .controller('officialCtrl', function($scope, $http, $location, $window) {
        $scope.formDataOfficial = {};
        $scope.formDataRole = {};
        $scope.formDataDriver = {};
    });