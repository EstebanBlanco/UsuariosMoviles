angular.module('appModule')
    .controller('secretaryCtrl', function($scope) {

        //verifica el radio que esta seleccionado
        // true= agregar -- false=eliminar
        var radio;
        var sede;
        var departamento;
        var JSON;/// simulacion de la petición

        //verifican el estado del radioButton
        $scope.radioTrue=function () {
            radio=true;
        }
        $scope.radioFalse=function () {
            radio=false;
        }

        //se optiene la sede seleccionada
        var selectSede = document.getElementById('sede_secretaria'); selectSede.addEventListener('change', function(){ var selectedOptionSede = this.options[selectSede.selectedIndex];
            sede=selectedOptionSede.text;
        });
        //se optiene el departamento seleccionadp
        var selectDepartamento = document.getElementById('departamento_secretaria'); selectDepartamento.addEventListener('change', function(){ var selectedOptionDep = this.options[selectDepartamento.selectedIndex];
            departamento=selectedOptionDep.text;
        });

        // verifico que se cumpla el formulario
        $scope.veriRadio=function () {
            if(radio==true)
            {
                //verifico que los select(departamento y sede) esten llenos
                if(sede!=undefined && departamento!=undefined)
                {
                    //optengo la cedula
                    var cedula=document.getElementById('DNI_secretary').value;
                    if(cedula!="")
                    {
                        //prueba de como se va a almacenar en un json
                        JSON=cedula+","+sede+","+departamento;
                    }
                    else{alert("Verifique llenar la cédula");}
                }
                else{alert("Verifique llenar los campos Sede y/o Departamento");}
            }
            if(radio==false) // esta es la opción eliminar
            {
                if(sede!=undefined && departamento!=undefined)
                {
                    var cedula=document.getElementById('DNI_secretary').value;
                    if(cedula!="")
                    {
                        //prueba de como se va a almacenar en un json
                        JSON=cedula+","+sede+","+departamento;
                    }
                    else{alert("Verifique llenar la cédula");}
                }
                else{alert("Verifique llenar los campos Sede y/o Departamento");}
            }
            if(radio==undefined) {alert("No se ha seleccionado ninguna opción");}
        }

        //verifico que se cumpla el segundo formulario de confirmacion del correo
        $scope.veriCorreo=function () {
            var correo=document.getElementById('secretary-email').value;
            if(correo!=""){
                JSON=JSON+","+correo;
                alert("Listo");
                console.log(JSON);
            }
            else{alert("Verifique llenar el correo");}
        }

        //limpiar el formulario
        $scope.limpiarForm = function(){
            document.getElementById('secretary-form').reset();
            document.getElementById('DNI_secretary').value = '';
        }
    });