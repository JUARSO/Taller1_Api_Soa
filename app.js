
var parqueo = require ("./public/javascripts/Clases/Parqueo");

var createError = require('http-errors');
var express = require('express'),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const https = require('https')
const fs = require('fs')

var corsOptions = {
  origin: 'http://localhost:3001/',
  optionsSuccessStatus: 200
}


var spacesRouter = require('./routes/spaces');
var reservationRouter = require('./routes/reservations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json("application/json"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/reservations', reservationRouter);
app.use('/spaces', spacesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(405));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



tecParqueo = new parqueo("tecparqueo", 10);
module.exports.tecParqueo = tecParqueo;
module.exports = app;
module.exports.corsOptions = corsOptions;


https.createServer({  key: fs.readFileSync('./public/security/cert.key'),
                              cert: fs.readFileSync('./public/security/cert.pem')
                  }, app).listen(3001, () => {
  console.log('Listening...')
})
