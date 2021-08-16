


var express = require('express');
var router = express.Router();
var app = require('../app')
var cors = require('cors')
var accepts = require('accepts')


/**
 * @swagger
 * /spaces:
 *   get:
 *     summary: Devuelve la lista de espacios disponibles.
 *     description: Devuelve la lista de espacios disponibles.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: false
 *         description: Indica si se debe de filtrar por estado.
 *         schema:
 *           type: string
 *       - in: path
 *         name: limit
 *         required: false
 *         description: Cantidad de elementos a recibir.
 *         schema:
 *           type: string
 *       - in: path
 *         name: offset
 *         required: false
 *         description: Numero de elemento por el cual empezar a filtrar.
 *         schema:
 *           type: string
 *       - in: path
 *         name: fields
 *         required: false
 *         description: Nombres de los campos a devolver.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La lista de espacios.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: El ID del espacio.
 *                         example: 0
 *                       state:
 *                         type: string
 *                         description: El estado del espacio.
 *                         example: free
 *                       carro:
 *                         type: object
 *                         properties:
 *                          id:
 *                              type: integer
 *                              description: El ID del espacio.
 *                              example: 0
 *                          placa:
 *                              type: string
 *                              description: La placa del carro.
 *                              example: abcd123
 *                          horaIngreso:
 *                              type: Date
 *                              description: La hora de ingreso del carro.
 *                              example: 2021-08-16T21:34:41.750Z
 *       406:
 *         description: Error. El cliente no acepta json.
 *         content:
 */
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
