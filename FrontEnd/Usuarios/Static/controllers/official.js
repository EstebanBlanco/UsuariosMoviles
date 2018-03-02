var app = angular.module('appModule')
    .controller('officialCtrl', function($scope, $http, $location, $window) {
        $scope.formDataOfficial = {};

        //deben ser listas
        $scope.formDataDriverLicense = {};
        $scope.formDataRole = {};

        $scope.formDataDriver = [
            {
                "id":"A",
                "items":["a1","a2","a3","a4"]
            },{
                "id":"B",
                "items":["b1","b2","b3","b4"]
            },{
                "id":"C",
                "items":["c1","c2"]
            },{
                "id":"D",
                "items":["d1","d2","d3"]
            },{
                "id":"E",
                "items":["e1","e2"]
            }
        ];
    });