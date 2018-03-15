angular.module('appModule')
    .controller('adminsCtrl', function($scope) {

        //----------------- Variables Globales ----------------------------

        var radio;//verifica el radio que esta seleccionado, true = asignar -- false = desasignar
        var sede;
        var funcionario;
        var aplicacion;
        //pone el botón en blanco
        $scope.terms = {
            label : "ok"
        }

        //--------------------------- Carga de datos a la vista----- ---------------------------------------

        //Carga las sedes a su respectivo select
        $scope.sedesOptions = [{ name: "Cartaguito Campeon", id: 1 }, { name: "San Carlitos a primera", id: 2 }];
        //$scope.selectedSedeOption = $scope.sedesOptions[0];

        //Carga los funcionarios a su respectivo select
        $scope.funcionariosOptions = [{ name: "Paco pedro", id: 1 }, { name: "Anacleto", id: 2 }];
        //$scope.selectedFuncOption = $scope.funcionariosOptions[0];

        // +++++++++ Cambia las aplicaciones en funcion de asignar o desasignar ++++++++++++++

        //carga todas las aplicaciones existentes al select de aplicaciones
        $scope.asignarFuntion = function () {
            radio = true; // true para asignar aplicacion al recoger formulario
            //cargar todas las aplicaciones al select de aplicaciones
            $scope.aplicacionesOptions = [{ name: "comedor", id: 1 }, { name: "ctec", id: 2 }, { name: "biblioteca", id: 2 }];
            //$scope.selectedAplicOption = $scope.aplicacionesOptions[0];
            //cambiar el texto del boton a asignar
            $scope.terms = {
                label : "Asignar"
            }
        }

        //carga las aplicaciones asignadasXFuncionario al select de aplicaciones
        $scope.desasignarFuntion = function () {
            radio = false; // false para desasignar una aplicacion al recoger formulario
            //cargar las aplicaciones x funcionario seleccionado al combo de aplicaciones
            $scope.aplicacionesOptions = [{ name: "comedor", id: 1 }, { name: "ctec", id: 2 }];
            //cambiar el texto del boton a Desasignar
            $scope.terms = {
                label : "Desasignar"
            }

        }


        //--------------------------- Obtencion y validacion de datos ---------------------------------------

        //optiener la sede seleccionada cada vez que cambia de seleccion
        var selectSede = document.getElementById('selectSede'); selectSede.addEventListener('change', function(){ var selectedOptionSede = this.options[selectSede.selectedIndex];
            sede = selectedOptionSede.text;
        });

        //optiener el administrador seleccionado cada vez que cambia de seleccion
        var selectFuncionario = document.getElementById('selectFuncionario'); selectFuncionario.addEventListener('change', function(){ var selectedOptionFuncionario = this.options[selectFuncionario.selectedIndex];
            funcionario = selectedOptionFuncionario.text;
        });

        //optiener el aplicacion seleccionado cada vez que cambia de seleccion
        var selectAplicacion = document.getElementById('selectAplicacion'); selectAplicacion.addEventListener('change', function(){ var selectedOptionAplicacion = this.options[selectAplicacion.selectedIndex];
            aplicacion = selectedOptionAplicacion.text;
        });

        // recoger los datos del formulario
        $scope.recogerFomulario = function () {
            //validar si todos los select tiene algo y si el radio tambien

            if(radio === true) { //Asigna una aplicacion
                console.log(sede + "  asignado");
                console.log(funcionario + "  asignado");
                console.log(aplicacion + "  asignado");

                $http({
                    method: "POST",
                    url: 'http://localhost:8080/doLogin',
                    data: {'sede': sede,'funcionario':funcionario, 'aplicacion':aplicacion}
                })
                    .then(function successCallback(response) {
                        if (response.data.message === 200){
                            //mandar alerta existosa
                            alert(response.data.data);

                        }
                        else{
                            //mandar alerta de fallo
                            console.log(response.data.data);
                            alert(response.data.data);
                        }
                    });

            }else{ //desasignar aplicacion
                console.log(sede + "  desasignado");
                console.log(funcionario + "  desasignado");
                console.log(aplicacion + "  desasignado");

                $http({
                    method: "POST",
                    url: 'http://localhost:8080/doLogin',
                    data: {'sede': sede,'funcionario':funcionario, 'aplicacion':aplicacion}
                })
                    .then(function successCallback(response) {
                        if (response.data.message === 200){
                            //mandar alerta existosa
                            alert(response.data.data);

                        }
                        else{
                            //mandar alerta de fallo
                            console.log(response.data.data);
                            alert(response.data.data);
                        }
                    });

            }


        }

        //limpiar el formulario
        $scope.limpiarForm = function(){
            document.getElementById('adminsForm').reset();
        }









    });