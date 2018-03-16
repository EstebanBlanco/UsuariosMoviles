var app = angular.module('appModule')
    .controller('officialCtrl', function($scope, $http, $location, $window) {
        //model of the main data
        $scope.formDataOfficial = {};

        //fill the role in the template
        $scope.dataRoles = [
            {
                id:"r1",
                role:"admin"
            },
            {
                id:"r2",
                role:"choofeeer"
            },
            {
                id:"r3",
                role:"tec"
            },
            {
                id:"r4",
                role:"other"
            }
        ];

        //fill the license driver
        $scope.formDataDriver = [
            {
                id:"A",
                ch: 1,
                items:["A1","A2","A3","A4"]
            },{
                id:"B",
                ch: 2,
                items:["B1","B2","B3","B4"]
            },{
                id:"C",
                ch: 3,
                items:["C1","C2"]
            },{
                id:"D",
                ch: 4,
                items:["D1","D2","D3"]
            },{
                id:"E",
                ch: 5,
                items:["E1","E2"]
            }
        ];

        //PENDIENTE
        $scope.isChecked = function (buttonID, checkBoxID) {
            var radioButtonArray = document.getElementsByName(buttonID);
            var checkBoxSelected = document.getElementsByName(checkBoxID);

            if(checkBoxSelected.checked){
                for (var i=0; i<radioButtonArray.length; i++)
                {
                    var radioButton = radioButtonArray[i];
                    radioButton.checked = false;
                    radioButton.disabled = true;
                }
            }

        };
    });