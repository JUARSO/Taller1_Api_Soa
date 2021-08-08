class Parqueo{
    listaEspacios;
    nombre;

    constructor(nombre, cantidad) {
        const Espacio = require('./Espacio');
        this.nombre = nombre;
        this.listaEspacios = []
        while (cantidad != 0){
            this.listaEspacios.push(new Espacio());
            --cantidad
        }
    }

    filtrarEspaciosPorEstado(estado){
        return this.listaEspacios.filter(espacio => espacio.estado === estado)
    }

    obtenerEspacioPorId(id){
        return this.listaEspacios.find(espacio => espacio.id == id)
    }

    obtenerCarros(){
        return this.listaEspacios.filter(espacio => espacio.carro !== undefined).map(espacio => espacio.carro)
    }

    obtenerEspacioLibre(){
        return this.filtrarEspaciosPorEstado('free')[0];
    }

    crearEspacio(){
        const Espacio = require('./Espacio');
        const espacio = new Espacio();
        this.listaEspacios.push(espacio);
        return espacio;
    }

    eliminarEspacio(id){
        const index = this.listaEspacios.findIndex(espacio => espacio.id == id)
        if(index !== -1){
            const espacio = this.obtenerEspacioPorId(id);
            if(espacio.estado === 'free'){
                this.listaEspacios = this.listaEspacios.slice(index);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}


module.exports = Parqueo;
