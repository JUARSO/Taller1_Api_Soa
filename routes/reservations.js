var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET home page. */
router.get('/', function(req, res, next) {
    const tecParqueo = app.tecParqueo
    const carros = tecParqueo.obtenerCarros()
    res.send(carros);
});


module.exports = router;
