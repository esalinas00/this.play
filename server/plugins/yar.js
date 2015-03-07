// TODO:
//  Set pass in config

// Local Vars ===================================
	var yar = function(server, options, next) {
		server.register({
			register: require('yar'),
			name: 'yar',
			options: {
				cookieOptions: {
					password: 'trustno1',
					isSecure: false
				}
			}
			}, function(err) {
				if (err) throw err;
			}
		);
	};

// Plugin export ================================
	module.exports =yar;