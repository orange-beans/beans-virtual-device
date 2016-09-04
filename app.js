  /**
 * Created by cczhang on 11/2/2015.
 */
/*
 * Module       : app.js
 * Description  : The ProX Server
 * Dependency   : http,
 *                express,
 *                ./lib/routes,
 *                body-parser,
 *                method-override,
 *                morgan,
 *                errorhandler,
 *                serialport;
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global */
'use strict';
// ------------ BEGIN MODULE SCOPE VARIABLES --------------
var
  //serialUtil =  require( 'serialport' ),
  http       =  require('http'),
  express    =  require('express'),
  routes     =  require('./lib/routes'),

  // required middle-wares which are omitted in Express 4.x
  //
  bodyParser     =  require('body-parser'),
  methodOverride =  require('method-override'),
  logger         =  require('morgan'),
  errorHandler   =  require('errorhandler'),

  app        =  express(),
  server     =  http.createServer(app),
  // Create a testing client
  client     = http.createClient(app),

  portConfig = {
    //port_name : process.argv[2],
    port_num  : 80,
  };

// ============= END MODULE SCOPE VARIABLES ===============

// ------------- BEGIN SERVER CONFIGURATION ---------------
// configuration for all environments
//
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
//app.use( app.router );

// configuration for development only
//
if ('development' === app.get('env')) {
  app.use(logger());
  app.use(errorHandler({
    dumpExceptions : true,
    showStack      : true,
  }));
}

// configuration for production only
//
if (process.env.NODE_ENV === 'production'){
  app.use(errorHandler());
}
// Disable serialport for pure server (EC2 Server)
// use a empty object for mySerialPort for now.
routes.configRoutes(app, server);
// ============== END SERVER CONFIGURATION ================

// ----------------- BEGIN START SERVER -------------------
server.listen(portConfig.port_num);
console.log(
  'Express server listening on port %d in %s model',
  server.address().port, app.settings.env
);
// ================== END START SERVER ====================
