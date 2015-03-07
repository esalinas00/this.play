var Boom = require('boom'),
	Hoek = require('hoek'),
	internals = {};

exports.register = function (plugin, options, next) {
	plugin.auth.scheme('basic', internals.implementation);
	next();
};

exports.register.attributes = {
	name: 'fend'
};

internals.implementation = function (server, options) {

	Hoek.assert(options, 'Missing basic auth strategy options');
	Hoek.assert(typeof options.validateFunc === 'function', 'options.validateFunc must be a valid function in basic scheme');

	var settings = Hoek.clone(options);

	var scheme = {
		authenticate: function (request, reply) {

			var key = request.params.key ? encodeURIComponent(request.params.key) : false;

			if (key===false) {
				return reply(Boom.forbidden('Invalid Key'), { credentials: null });
			}

			settings.validateFunc(key,function (err, isValid, credentials) {

				credentials = credentials || null;

				if (err) {
					return reply(err, { credentials: credentials, log: { tags: ['auth', 'basic'], data: err } });
				}

				if (!isValid) {
					return reply(Boom.forbidden('Invalid Key'), { credentials: credentials });
				}

				if (!credentials ||
					typeof credentials !== 'object') {

					return reply(Boom.badImplementation('Bad credentials object received for Basic auth validation'), { log: { tags: 'credentials' } });
				}

				// Authenticated
				return reply(null, { credentials: credentials });
			});
		}
	};

	return scheme;
};