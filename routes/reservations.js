var express = require('express');
var router = express.Router();
var app = require('../app')
var cors = require('cors')

/* GET home page. */
router.get('/', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const fields = req.query.fields;
        let carros = tecParqueo.obtenerCarros()

        carros = JSON.parse(JSON.stringify(carros))
        carros = carros.slice(req.query.offset).slice(0,req.query.limit);
        if(fields) {
            if (!fields.includes("placa")) {
                carros.forEach(carro => {
                    delete carro.placa
                });
            }
            if (!fields.includes("horaIngreso")) {
                carros.forEach(carro => {
                    delete carro.horaIngreso
                });
            }
        }
        res.send(carros);
    }else{
        res.status(406).send()
    }
});


/* GET home page. */
router.post('/', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const Carro = require('../public/javascripts/clases/Carro');

        if(req.body.placa === undefined || req.body.placa === ''){
            res.status(400).send({message: "Es necesaria la placa"})
        }else{
            const carro = new Carro();
            carro.placa = req.body.placa
            carro.horaIngreso = new Date()
            const espacio = tecParqueo.obtenerEspacioLibre()
            if(espacio !== undefined){
                espacio.setCarro(carro)
                res.send({message: "Reservación exitosa", espacio})
            }else{
                res.status(409).send({message: "No hay espacios libres"})
            }
        }
    }else{
        res.status(406).send()
    }
});

router.delete('/:id', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
        if(espacio === undefined){
            res.status(400).send({message: "No existe el espacio"})
        }else{
            espacio.eliminaReserva();
            res.send({message: "Espacio desocupado"})
        }
    }else{
        res.status(406).send()
    }
});

router.options('/:id', cors(app.corsOptions)) // enable pre-flight request for DELETE request
router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request

module.exports = router;
