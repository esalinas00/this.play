// Dependencies =================================
	var Joi = require('joi');

// Routes Object ================================
	var api = {
		user: {
			index: {
				handler: function(request, reply) {
					reply('API User Info');
				}
			},
			edit: {
				handler: function(request, reply) {
					reply('API User Edit/Add');
				}
			},
			delete: {
				handler: function(request, reply) {
					reply('API User Delete');
				}
			}
		},
		display: {
			index: {
				handler: function(request, reply) {
					const id = request.params.id ? encodeURIComponent(request.params.id) : 0;
					const db = request.server.plugins['hapi-mongodb'].db;
					var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

					if (id !== 0) {
						db.collection('displays').findOne({  "_id" : new ObjectID(id) }, function(err, result) {
							if (err) return reply(Boom.internal('Internal MongoDB error', err));
							reply(result);
						});
					} else {
						db.collection('displays').find({}).toArray(function(err, docs) {
							if (err) return reply(Boom.internal('Internal MongoDB error', err));
							reply(docs);
						});
					}
				}
			},
			edit: {
				handler: function(request, reply) {
					const id = request.params.id ? encodeURIComponent(request.params.id) : 0;
					const db = request.server.plugins['hapi-mongodb'].db;
					var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
					reply("test");
				}
			},
			delete: {
				handler: function(request, reply) {
					reply('API Display Delete');
				}
			}
		}
	}

// Exposing API Routes ========================
	module.exports = api;