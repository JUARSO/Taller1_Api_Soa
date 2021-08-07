class Espacio {

    id;
    estado;
    carros;
    static cantidadID = 0;

    constructor() {
        this.id = ++Espacio.cantidadID;
        this.estado = 'free';
    }

    setEstado(value) {
        if(value === 'free' || value === 'in-use') {
            this.estado = value;
        }
    }

    setCarros(value) {
        this.carros = value;
    }

}

module.exports = Espacio;
