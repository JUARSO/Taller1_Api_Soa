var express = require('express');
var router = express.Router();
var app = require('../app')
var cors = require('cors')

/**
 * @swagger
 * tags:
 * name: Reservation
 * description: API to manage your books.
 */

/**
 * @swagger
 * /reservation:
 *   get:
 *     tags: [Reservation]
 *     summary: Devuelve una lista con la lsita de espacios reservados.
 *     description: Devuelve una lista con la lsita de espacios reservados.
 *     parameters:
 *       - in: query
 *         name: Placa
 *         required:
 *         description: Indica si se debe de filtrar por placa.
 *         schema:
 *          type: string
 *       - in: query
 *         name: Hora de ingreso
 *         required:
 *         description: Indica si se debe de filtrar por placa.
 *         schema:
 *           type: date
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad de elementos a recibir.
 *         schema:
 *           type: number
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Numero de elemento por el cual empezar a filtrar.
 *         schema:
 *           type: number
 *       - in: query
 *         name: fields
 *         required: false
 *         description: Nombres de los campos a devolver.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La listado de datos con respecto a la reservacion.
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

/**
 * @swagger
 * /reservation:
 *   post:
 *     tags: [Reservation]
 *     summary: Agrega una reservacion
 *     description: Agrega una reservacion utilizando el numero de placa de este
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Placa:
 *                 type: string
 *                 description: Indica la placa del carro.
 *                 example: abcd1234

 *     responses:
 *       200:
 *         description: Respuesta con el resultado del post
 *         content:
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: Es necesaria la placa
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: No hay espacios libres
 *       406:
 *         description: Error. El cliente no acepta el dato.
 *         content:
 */
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
/**
 * @swagger
 * /reservation/{id}:
 *   delete:
 *     tags: [Reservation]
 *     summary: Elimina una reservavion
 *     description: Elimina una reservacion utilizando el id del espacio
 *     parameters:
 *       - in: path
 *         name: Id
 *         required:
 *         description: Id del espacio que se utiliza
 *         schema:
 *          type: number

 *     responses:
 *       200:
 *         description: Respuesta con el rasultado del delete
 *         content:
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Mensaje de error.
 *                         example: No existe el espacio
 *       406:
 *         description: Error. El cliente no acepta el dato.
 *         content:
 */
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
