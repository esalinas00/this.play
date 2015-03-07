// Local Vars ===================================
	var config 	= require('../config/');
	var dbOpts = {
		"url": "mongodb://localhost:27017/thisplay",
		"settings": {
				"db": {
				"native_parser": false
			}
		}
	};

	var mongo = function(server, options, next) {
		server.register({
				register: require('hapi-mongodb'),
				options: dbOpts,
			}, function(err) {
				if (err) throw err;
			}
		);
	};

// Plugin export ================================
	module.exports = mongo;