angular.module('appModule')
    .controller('secretaryCtrl', function($scope) {

        //******************************************************INICIO Obtencion de datos y validaciones de atos
        //verifica el radio que esta seleccionado
        // true= agregar -- false=eliminar
        var radio;
        var sede;
        var departamento;


        $scope.variableAgregarElimina=true; //dependiendo del radio button me muetra diferentes ventanas extendidas
        $scope.allSelected=true; //verifica que todos el formulario este lleno

        //verifican el estado del radioButton
        $scope.radioTrue=function () {
            radio=true;
            $scope.variableAgregarElimina=true;
        }
        $scope.radioFalse=function () {
            radio=false;
            $scope.variableAgregarElimina=false;
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
            if(radio==true) {
                //verifico que los select(departamento y sede) esten llenos
                if(sede!=undefined && departamento!=undefined) {
                    //optengo la cedula
                    var cedula=document.getElementById('DNI_secretary').value;
                    if(cedula!="") {
                        $scope.allSelected= true;

                        //seteo los parametros en el formulario de envio de emaji
                        document.getElementById('secretary-cedula-respaldo').value= cedula;
                        document.getElementById('secretary-departamento-respaldo').value= departamento;
                        document.getElementById('secretary-sede-respaldo').value= sede;
                    }
                    else{
                        alert("Verifique llenar la cédula");
                        $scope.allSelected= false;
                    }
                }
                else{alert("Verifique llenar los campos Sede y/o Departamento");
                    $scope.allSelected= false;
                }
            }
            if(radio==false) // esta es la opción eliminar
            {
                if(sede!=undefined && departamento!=undefined)
                {
                    var cedula=document.getElementById('DNI_secretary').value;
                    if(cedula!="") {
                        $scope.allSelected= true;
                    }
                    else{
                        alert("Verifique llenar la cédula");
                        $scope.allSelected= false;
                    }
                }
                else{alert("Verifique llenar los campos Sede y/o Departamento");
                    $scope.allSelected= false;
                }
            }
            if(radio==undefined) {alert("No se ha seleccionado ninguna opción");
                $scope.allSelected= false;}
        }

        //verifico que se cumpla el segundo formulario de confirmacion del correo
        $scope.veriCorreo=function () {
            var correo=document.getElementById('secretary-email').value;
            if(correo!=""){

                //creo el objetoPersona: si paso la prueba de veriRadio: entro a veriCorreo
                var json = new persona(document.getElementById('DNI_secretary').value,sede,departamento,correo);
                return json;
            }
            else{alert("Verifique llenar el correo"); return null;}
        }

        //limpiar el formulario
        $scope.limpiarForm = function(){
            document.getElementById('secretary-form').reset();
            document.getElementById('DNI_secretary').value = '';
            document.getElementById('secretary-email').value = '';
            document.getElementById('secretary-cedula-respaldo').value= '';
            document.getElementById('secretary-departamento-respaldo').value= '';
            document.getElementById('secretary-sede-respaldo').value= '';
        }
        //****************************************************** FIN Obtencion de datos y validaciones de atos



        //****************************************************** INICIO ENVIO DE CORREO
        $scope.emailSend=function ()  {

            var objetoUsuario = $scope.veriCorreo();
            console.log(objetoUsuario );

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
                        //limpio el input correo
                        document.getElementById('secretary-email').value = '';
                    }, function(err) {
                        alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                        myform.find("button").text("Send");
                    });
                return false;
            });
        }


        //creacion de objeto persona
        function persona(pcedula,psede,pdepartamento,pcorreo) {
            this.cedula=pcedula;
            this.sede=psede;
            this.departamento=pdepartamento;
            this.correo=pcorreo;
        }

    });