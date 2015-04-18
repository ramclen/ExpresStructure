var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = require('express')();
var path = require('path');
var rulesBuilder = require('./model/RulesBuilder');
var routesTable = require('./model/RoutesTable').routes;


configureServer();
rulesBuilder.build(app, routesTable);


function configureServer() {
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, 'views'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
}

module.exports = app;
