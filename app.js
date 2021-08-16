
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

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/spaces",
            },
            {
                url: "http://localhost:3000/reservations",
            },

        ],
    },
    apis: ["./routes/spaces.js","./routes/reservations.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

https.createServer({  key: fs.readFileSync('./public/security/cert.key'),
                              cert: fs.readFileSync('./public/security/cert.pem')
                  }, app).listen(3001, () => {
  console.log('Listening...')
})
