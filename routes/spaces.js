var express = require('express');
var router = express.Router();
var app = require('../app')
var cors = require('cors')
var accepts = require('accepts')

/* GET home page. */
router.get('/', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const estadoQuery = req.query.state;
        if(estadoQuery === undefined) {
            try {
                res.send(tecParqueo.listaEspacios.slice(req.query.limit, req.query.offset))
            } catch (error) {
                res.send(tecParqueo.listaEspacios)
            }
        }
        else if(estadoQuery === 'free' || estadoQuery === 'in-use'){
            try{
                res.send(tecParqueo.filtrarEspaciosPorEstado(estadoQuery).slice(req.query.limit, req.query.offset))
            }catch (error){
                res.send(tecParqueo.filtrarEspaciosPorEstado(estadoQuery))
            }
        }else{
            res.status(400).send({message: "Tipo de estado no soportado"})
        }
    }else{
        res.status(406).send()
    }
});

/* GET home page. */
router.get('/:id', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
        if(espacio !== undefined){
            res.send(espacio)
        }else{
            res.status(400).send({message: "No existe un espacio con el id indicado"})
        }
    }else{
        res.status(406).send()
    }
});

/* GET home page. */
router.post('/', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        if(req.body.description === undefined){
            res.status(400).send({message: "Debe indicarse una descripcion"})
        }else{
            const tecParqueo = app.tecParqueo
            const espacio = tecParqueo.crearEspacio()
            espacio.setDescripcion(req.body.description)
            res.send(espacio)
        }
    }else{
        res.status(406).send()
    }
});

/* GET home page. */
router.put('/:id', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const espacio = tecParqueo.obtenerEspacioPorId(req.params.id);
        if(espacio !== undefined){
            if(req.body.description === undefined){
                res.status(400).send({message: "Debe indicarse una descripcion"})
            }else {
                espacio.setDescripcion(req.body.description)
                res.send(espacio)
            }
        }else{
            res.status(400).send({message: "No existe un espacio con el id indicado"})
        }
    }else{
        res.status(406).send()
    }
});

/* GET home page. */
router.delete('/:id', cors(app.corsOptions), function(req, res, next) {
    if(req.accepts('application/json')){
        const tecParqueo = app.tecParqueo
        const espacio = tecParqueo.obtenerEspacioPorId(req.params.id)
        if(espacio !== undefined){
            const resultado = tecParqueo.eliminarEspacio(req.params.id)
            if(resultado){
                res.send({message: "Se eliminó con éxito"})
            }else{
                res.status(409).send({message: "El espacio está ocupado"})
            }
        }else {
            res.status(400).send({message: "No existe un espacio con el id indicado"})
        }
    }else{
        res.status(406).send()
    }
});

module.exports = router;
