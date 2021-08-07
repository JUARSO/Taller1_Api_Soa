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
}


module.exports = Parqueo;
