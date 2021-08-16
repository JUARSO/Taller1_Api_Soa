


var express = require('express');
var router = express.Router();
var app = require('../app')
var cors = require('cors')
var accepts = require('accepts')


/**
 * @swagger
 * tags:
 * name: Spaces
 * description: API to manage your books.
 */

/**
 * @swagger
 *    components:
 *        schemas:
 *            Space:
 *                type: object
 *                required:
 *                    - id
 *                    - status
 *                properties:
 *                       id:
 *                         type: integer
 *                         description: El ID del espacio.
 *                         example: 0
 *                       state:
 *                         type: string
 *                         description: El estado del espacio.
 *                         example: free
 *                       description:
 *                          type: string
 *                          description: Descripcion del espacio
 *                          example: Muy Bonito
 *                       carro:
 *                          $ref: '#/components/schemas/Carro'
 *            Carro:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: El ID del espacio.
 *                      example: 0
 *                  placa:
 *                      type: string
 *                      description: La placa del carro.
 *                      example: abcd123
 *                  horaIngreso:
 *                      type: Date
 *                      description: La hora de ingreso del carro.
 *                      example: 2021-08-16T21:34:41.750Z


 */

/**
 * @swagger
 * /spaces:
 *   get:
 *     tags: [Spaces]
 *     summary: Devuelve la lista de espacios disponibles.
 *     description: Devuelve la lista de espacios disponibles.
 *     parameters:
 *       - in: query
 *         name: state
 *         required: false
 *         description: Indica si se debe de filtrar por estado.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad de elementos a recibir.
 *         schema:
 *           type: string
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Numero de elemento por el cual empezar a filtrar.
 *         schema:
 *           type: string
 *       - in: query
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
 *                     $ref: '#/components/schemas/Space'
 *       406:
 *         description: El cliente no acepta json.
 *         content:
 *   post:
 *     tags: [Spaces]
 *     summary: Agrega un espacio nuevo.
 *     description: Agrega un espacio nuevo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: La descripcion del espacio.
 *                 example: Muy Bonito
 *     responses:
 *       200:
 *         description: El espacio creado.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Space'
 *       406:
 *         description: El cliente no acepta json.
 *         content:
 */
/**
 * @swagger
 *   /spaces/{id}:
 *   get:
 *     tags: [Spaces]
 *     summary: Devuelve un espacios.
 *     description: Devuelve un espacios.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de espacio a solicitar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La lista de espacios.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Space'
 *       406:
 *         description: El cliente no acepta json.
 *         content:
 *       400:
 *         description: No existe el espacio con el ID indicado.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: No existe un espacio con el id indicado
 *   put:
 *     tags: [Spaces]
 *     summary: Edita un espacio existente.
 *     description: Edita un espacio existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de espacio a modificar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: La descripcion del espacio.
 *                 example: Muy Bonito
 *     responses:
 *       200:
 *         description: El espacio modificado.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Space'
 *       406:
 *         description: El cliente no acepta json.
 *         content:
 *       400:
 *         description: No existe el espacio con el ID indicado.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: No existe un espacio con el id indicado
 *   delete:
 *     tags: [Spaces]
 *     summary: Elimina un espacio.
 *     description: Elimina un espacio.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de espacio a modificar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Se eliminó con éxito.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje.
 *                         example: Se eliminó con éxito
 *       400:
 *         description: No existe el espacio con el ID indicado.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: No existe un espacio con el id indicado
 *       406:
 *         description: El cliente no acepta json.
 *         content:
 *       409:
 *         description: El espacio está ocupado.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: El espacio está ocupado
*/
/* GET spaces*/
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

/* GET space*/
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

/* POST space*/
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

/* PUT space*/
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

/* DELETE space*/
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
