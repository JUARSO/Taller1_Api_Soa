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
        const fields = req.query.fields;

        let listaEspacios = [];

        listaEspacios = tecParqueo.listaEspacios;
        listaEspacios = JSON.parse(JSON.stringify(listaEspacios))
        if(estadoQuery){
            listaEspacios = tecParqueo.filtrarEspaciosPorEstado(listaEspacios, estadoQuery)
        }

        if(fields){
            if(!fields.includes("state")){
                listaEspacios.forEach(espacio=>{
                    delete espacio.estado
                });
            }
            if(!fields.includes("car")){
                listaEspacios.forEach(espacio=>{
                    delete espacio.carro
                });
            }
            if(!fields.includes("description")){
                listaEspacios.forEach(espacio=>{
                    delete espacio.descripcion
                });
            }
        }
        listaEspacios = listaEspacios.slice(req.query.offset).slice(0,req.query.limit);
        res.send(listaEspacios)
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
