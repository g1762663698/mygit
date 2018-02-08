// server.js 
var jsonServer  = require('json-server');
var path        = require('path');
var ip          = require('ip').address();
var server      = jsonServer.create();

var db          = require(path.join(__dirname,'db.js'));
var routes      = require(path.join(__dirname,'routes.js'));

var router      = jsonServer.router(db);
var middlewares = jsonServer.defaults();
var rewriter    = jsonServer.rewriter(routes);
  
    server.use(middlewares);
    server.use(jsonServer.bodyParser);
    server.use(rewriter);
    server.use(router);
    
    server.listen({
        host : ip,
        port : 3000
    },function(){
        console.log(`opn http://${ip}:3000`)
    })

