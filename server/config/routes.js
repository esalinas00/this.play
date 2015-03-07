// Dependencies =================================
	var requireDirectory 	= require('require-directory');

// Dependencies =================================
	module.exports = function(server) {
		// Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
		var controller = requireDirectory(module, server.app.root+'/server/controllers'),
			api = controller.api;

		// Array of Routes to pass to Server
		var routes_table = [
			// API
			{
				method: 'GET',
				path: '/api/display/{id?}',
				config: api.display.edit
			},

			// Public
			{
				method: 'GET',
				path: '/',
				config: controller.public.index
			},

			// Public Assets Route
			{
				method: 'GET',
				path: '/views/{path*}',
				handler: {
					directory: { path: './app/'+ server.app.env.name +'/views', listing: false, index: true }
				}
			},
			{
				method: 'GET',
				path: '/assets/js/{path*}',
				handler: {
					directory: { path: './app/dist/assets/js', listing: false, index: true }
				}
			},
			{
				method: 'GET',
				path: '/assets/{path*}',
				handler: {
					directory: { path: './app/'+ server.app.env.name +'/assets/', listing: false, index: true }
				}
			}
		];

		server.route(routes_table);
	};