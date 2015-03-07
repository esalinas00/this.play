// app.js
// Luis Matute


// Dependencies =================================
var Hapi = require('hapi'),
	config 	= require('./server/config/');

// Initialization code for the App ==============
	var server = new Hapi.Server();
	server.connection({
		host: config.env.host,
		port: config.port,
		labels: 'web'
	});
	server.views({
		engines: { html: require('express-hbs') },
		path: config.rootPath+'/public'
	});

	// Socket IO
	require('./server/io')(server);

	// App settings
	server.app = config;

	// Bootstrap Hapi Server Plugins, passes the server object to the plugins
	require('./server/plugins')(server);

	// Require the routes and pass the server object.
	require('./server/config/routes')(server);

// Start the server =============================
	server.start(function() {
		//Log to the console the host and port info
		console.log('Server started at: ' + server.info.uri);
	});



// http://mindthecode.com/lets-build-an-angularjs-app-with-browserify-and-gulp