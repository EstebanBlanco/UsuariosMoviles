//Creacion de la variable que contiene la referencia del modulo creado en App.JS
angular.module("acreditacion")
    .service("gestionDimensiones",function () {
        var listaDimensiones = [];//LISTA QUE ALMACENARÁ TEMPORALMENTE LAS DIMENSIONES
        var listaComponentes = [];

        var registro = function (nombre,listaComponentes) {
            this.nombreDimension = nombre;
            this.listaComponentes = listaComponentes;
        }

        var componente = function (componente,estado) {
            this.Componente = componente;
            this.Estado= estado;
        }

        /*PERMITE AGREGAR UN NUEVO ITEM A LA LISTA*/
        this.save = function (nombre,listaComponentes) {
            listaDimensiones.push(new registro(nombre,listaComponentes));
            console.log(listaDimensiones);
        }

        /*PERMITE ELIMINAR DE LOS REGISTROS UN ITEM EN ESPECIFICO*/
        this.removeItem = function (ID) {
            for(i in listaDimensiones){
                if(listaDimensiones[i].nombreDimension = ID){
                    listaDimensiones.splice(i,1);
                    localStorage.setItem("listaDimensiones",JSON.stringify(listaDimensiones));
                    return true;
                }
            }
            return false;
        }

        /*PERMITE BORRAR TODOS LOS REGISTROS ALMACENADOS*/
        this.removeAll = function () {
            localStorage.setItem("listaDimensiones",JSON.stringify([]));
        }

        /*PERMITE EDITAR UN REGISTRO EN ESPECIFICO*/
        this.edit = function (nuevoRegistro) {
            for(i in listaDimensiones){
                if(listaDimensiones[i].nombreDimension = nuevoRegistro.nombreDimension){
                    listaDimensiones[i] = nuevoRegistro;
                    return true;
                }
            }
            return false;
        }

        /*RETORNA TODA LA LISTA DE DIMENSIONES QUE SE HA CREADO HASTA EL MOMENTO*/
        this.getAll = function () {
            return listaDimensiones;
        }

        /*PERMITE BUSCAR UN REGISTRO POR ID, SINO EXISTE RETORNA FALSE*/
        this.getItem = function (ID) {
            for(i in listaDimensiones){
                if(ID = listaDimensiones[i].nombreDimension){
                    return listaDimensiones[i];
                }
            }
            return false;
        }

        /*PERMITE AGREGAR UN COMPONENTE A LA LISTA, ESTOS COMPONENTES ESTARÁN ASOCIADOS A UNA DIMENSIÓN*/
        this.saveComponents = function (componente) {
            for(i in listaComponentes){
                if(listaComponentes[i].Componente == componente){
                    return false;
                }
                else{
                    listaComponentes.push(componente);
                    return true;
                }
            }
        }

        this.getComponents = function () {
            return listaComponentes;
        }
    })
    .controller("Dimensiones",function($scope,gestionDimensiones,gestionComponentes) {
            $(document).ready(function () {

                $scope.listaComponentes = gestionComponentes.getAll();
                $(".selectpicker").selectpicker();
            });


            $scope.updateSelected = function (item) {

            }

            /*PERMITE AGREGAR UN NUEVO REGISTRO CUANDO SE DA CLICK EN EL BOTÓN SE EJECUTA LA FUNCIÓN*/
            function getComponentsSelected(){
                var selectedComponents = $(".selectpicker").val();
                var result = [];
                for(i in components){
                    result.push(gestionComponentes.getItem(selectedComponents[i]));
                }
                console.log(result);
                return result;
            }
            $scope.save = function () {
                gestionDimensiones.save($scope.nombreDimension,getComponentsSelected());
                $scope.nuevoRegistro = {}; // se reinicia el objeto

                $.notify("Registro agregado!","success");
                $("#modalAddDimension").modal("hide");
            }

            /*CUANDO SE PRESIONA EL BOTÓN DE BORRAR SE OBTIENE EL ID Y SE ELIMINA*/
            $scope.borrarDimension = function (id) {
                swal({
                    title: "¿Esta seguro que desea eliminar este registro?",
                    text: "Esta acción no podrá revertirse.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: false
                }, function () {
                    var result = gestionDimensiones.remove(id);
                    if(result){
                        swal({
                            title: "Eliminado",
                            text: "El registro ha sido eliminado exitosamente.",
                            type: "success",
                            confirmButtonColor: "#140e39",
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                    else{
                        swal({
                            title: "Error",
                            text: "Error al intentar eliminar registro",
                            type: "error",
                            confirmButtonColor: "#140e39",
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                });
            }

            /*CUANDO SE */
            $scope.edit = function (id) {
                $scope.registro = angular.copy(gestionDimensiones.getItem(id));
            }

        }
    );