class Espacio {

    id;
    estado;
    carro;
    descripcion;
    static cantidadID = 0;

    constructor() {
        this.id = ++Espacio.cantidadID;
        this.estado = 'free';
    }

    setDescripcion(descripcion){
        this.descripcion = descripcion;
    }

    setEstado(value) {
        if(value === 'free' || value === 'in-use') {
            this.estado = value;
        }
    }

    setCarro(carro) {
        this.carro = carro;
        carro.id = this.id;
    }

    eliminaReserva(carro){
        this.carro = null;
        carro = null;
    }

}

module.exports = Espacio;
