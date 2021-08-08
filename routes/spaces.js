var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET home page. */
router.get('/', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const estadoQuery = req.query.state;
    if(estadoQuery === undefined){
        res.send(tecParqueo.listaEspacios)
    }else if(estadoQuery === 'free' || estadoQuery === 'in-use'){
        res.send(tecParqueo.filtrarEspaciosPorEstado(estadoQuery))
    }else{
        res.status(404).send({message: "Tipo de estado no soportado"})
    }
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
    if(espacio !== undefined){
        res.send(espacio)
    }else{
        res.status(404).send({message: "No existe un espacio con el id indicado"})
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const espacio = tecParqueo.crearEspacio()
    espacio.setDescripcion(req.body.description)
    res.send(espacio)
});

/* GET home page. */
router.put('/:id', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
    if(espacio !== undefined){
        espacio.setDescripcion(req.body.description)
        res.send(espacio)
    }else{
        res.status(404).send({message: "No existe un espacio con el id indicado"})
    }
});

/* GET home page. */
router.delete('/:id', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const espacio = tecParqueo.obtenerEspacioPorId(req.params.id)
    if(espacio !== undefined){
        const resultado = tecParqueo.eliminarEspacio(req.params.id)
        if(resultado){
            res.send({message: "Se eliminó con éxito"})
        }else{
            res.status(404).send({message: "El espacio está ocupado"})
        }
    }else {
        res.status(404).send({message: "No existe un espacio con el id indicado"})
    }
});

module.exports = router;
