var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var NotFoundHandler = require('./handlers/errors/NotFound');

exports.build = function makeRules(app, routesTable) {
    addRoutes(app, routesTable);
    errorRulesBuilder(app);
};

function addRoutes(app, routesTable) {
    for(var key in routesTable) {
        app.use(key, routesTable[key])
        console.log("adding route: " + key);
    }
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    console.log("adding static dir: " + path.join('..', 'public'));
    app.use(express.static(path.join('..', 'public')));
}

function errorRulesBuilder(app) {
    app.use(NotFoundHandler);
    app.use(enviromentErrorHandler(app.get('env')));
}

function enviromentErrorHandler(enviroment) {
    return function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: (enviroment==='development')? err: {}
        });
    }
}







