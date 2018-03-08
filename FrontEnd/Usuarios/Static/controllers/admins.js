angular.module('appModule')
    .controller('adminsCtrl', function($scope) {

        //--------------------------- Obtencion de datos y validaciones de datos ---------------------------------------

        var sede;
        var administrador;
        var JSON;/// simulacion de la petición


        //optiener la sede seleccionada
        var selectSede = document.getElementById('sede_administrador'); selectSede.addEventListener('change', function(){ var selectedOptionSede = this.options[selectSede.selectedIndex];
            sede=selectedOptionSede.text;
        });
        //optiener el administrador seleccionado
        var selectAdministrador = document.getElementById('administrador'); selectAdministrador.addEventListener('change', function(){ var selectedOptionDep = this.options[selectAdministrador.selectedIndex];
            administrador=selectedOptionDep.text;
        });

        // recoger los datos del formulario
        $scope.recogerFormulario=function () {

            //verifica que los select sede y funcionario estén seleccionados
            if(sede!==undefined && administrador!==undefined)
            {

            }
            else{
                alert("Verifique llenar los campos Sede y/o Departamento");
                $scope.allSelected= false;
            }

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
            document.getElementById('secretary-email').value = '';
        }
        //****************************************************** FIN Obtencion de datos y validaciones de atos

        //****************************************************** INICIO ENVIO DE CORREO

        $scope.emailSend=function ()  {
            alert("entro!");

            var myform = $("form#myform");
            myform.submit(function(event){
                event.preventDefault();

                var params = myform.serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});

                // Change to your service ID, or keep using the default service
                var service_id = "default_service";

                var template_id = "correo_de_aceptacion";
                myform.find("button").text("Enviando...");
                emailjs.send(service_id,template_id,params)
                    .then(function(){
                        alert("Sent!");
                        myform.find("button").text("Exitoso");
                    }, function(err) {
                        alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                        myform.find("button").text("Send");
                    });
                return false;
            });
        }


    });