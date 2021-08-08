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
        this.estado = 'in-use';
    }

    eliminaReserva(){
        this.carro = undefined;
        this.estado = 'free';
    }

}

module.exports = Espacio;
