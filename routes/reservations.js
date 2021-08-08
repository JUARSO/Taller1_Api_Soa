var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET home page. */
router.get('/', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const carros = tecParqueo.obtenerCarros()
    res.send(carros);
});


/* GET home page. */
router.post('/', function(req, res, next) {
    const tecParqueo = app.tecParqueo

    const carro = new Carro();
    carro.placa = req.body.placa
    carro.horaIngreso = new Date()

    const espacio = tecParqueo.obtenerEspacioLibre()
    if(espacio !== undefined){
        espacio.setCarro(carro)
        res.send({message: "Reservación exitosa"})
    }else{
        res.status(405).send({message: "No hay espacios libres"})
    }
});

router.delete('/:id', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
    if(espacio === undefined){
        res.status(405).send({message: "No existe el espacio"})
    }else{
        espacio.eliminaReserva();
        res.send({message: "Espacio desocupado"})
    }
});

module.exports = router;
