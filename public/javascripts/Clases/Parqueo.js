class Parqueo{
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
    listaEspacios;
}


module.exports = Parqueo;
