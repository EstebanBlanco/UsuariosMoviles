/**
 * Created by Josue on 29/10/2017.
 */

angular.module("acreditacion")
    .service("gestionComponentes",function () {
        var listaComponentes = [];
        if(JSON.parse(localStorage.getItem("listaComponentes")) != null){
            listaComponentes = JSON.parse(localStorage.getItem("listaComponentes"));
        }
        else{
            localStorage.setItem("listaComponentes",JSON.stringify([]));
        }

        var componente = function (nombreComponente) {
            this.Componente = nombreComponente;
        }

        this.save = function (nombreComponente) {
            listaComponentes.push(new componente(nombreComponente));
            window.localStorage.setItem("listaComponentes",JSON.stringify(listaComponentes));
        }

        this.removeAll = function () {
            localStorage.removeItem("listaComponentes");
        }

        this.removeItem = function (nombreComponente) {
            for(i in listaComponentes){
                if(listaComponentes[i].Componente == nombreComponente){
                    listaComponentes.splice(i,1);
                }
            }
            localStorage.setItem("listaComponentes",JSON.stringify(listaComponentes));
        }

        this.edit = function (registroNuevo) {
            for(i in listaComponentes){
                if(listaComponentes[i].Componente == registroNuevo.nombre){
                    listaComponentes[i] = registroNuevo;
                }
            }
            localStorage.setItem("listaComponentes",JSON.stringify(listaComponentes));
        }

        this.getAll = function () {
            console.log(listaComponentes);
            return listaComponentes;
        }
        this.getItem = function (nombre) {
            for(i in listaComponentes){
                if(listaComponentes[i].nombreComponente == nombre){
                    return listaComponentes[i];
                }
            }
            return false;
        }
    });