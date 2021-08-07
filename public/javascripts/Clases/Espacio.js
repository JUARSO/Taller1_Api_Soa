class Espacio {

    id;
    estado;
    carro;
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

    setCarro(carro) {
        this.carro = carro;
    }

}

module.exports = Espacio;
