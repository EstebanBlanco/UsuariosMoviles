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
        $scope.dataDriver = [
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

        //verify the checked roles
        $scope.roleList = [];
        $scope.roleChecked = function() {
            for(var i=0; i < this.dataRoles.length; i++){
                if(document.getElementById(this.dataRoles[i].id).checked) this.roleList.push(this.dataRoles[i].id);
            }
        };

        //verify the checked licenses
        $scope.licenseList = [];
        $scope.licenseChecked = function() {
            for(var i=0; i < this.dataDriver.length; i++){
                var radioButtonArray = document.getElementsByName(this.dataDriver[i].id);
                for (var j=0; j<radioButtonArray.length; j++){
                    if(radioButtonArray[j].checked) this.licenseList.push(radioButtonArray[j].id);
                }
            }
        };

        //disable or enable radio groups
        $scope.isChecked = function (buttonID, checkBoxID) {
            var radioButtonArray = document.getElementsByName(buttonID);
            var checkBoxSelected = document.getElementById(checkBoxID);
            //if checkbox true then enable radio group
            for (var j=0; j<radioButtonArray.length; j++){
                var radioButton= radioButtonArray[j];
                radioButton.disabled = !checkBoxSelected.checked; radioButton.checked = false;
            }
        };
    });