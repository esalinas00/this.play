// Local Vars ===================================
	var config 	= require('../config/'),
		cl 		= (config.env.name==='dev')? ['ops', 'request', 'log', 'error']: [];

	var good = function(server, options, next) {
		server.register({
			register: require('good'),
			name: 'good',
			options: {
				reporters: [
					{
						reporter: require('good-console'),
						args:[{ log: '*', response: '*' }]
					}
				],
				opsInterval: 600000
			}
			}, function(err) {
				if (err) throw err;
			}
		);
	};

// Plugin export ================================
	module.exports = good;