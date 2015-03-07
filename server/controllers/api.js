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
					reply('API Display Info');
				}
			},
			edit: {
				handler: function(request, reply) {
					var id = request.params.id ? encodeURIComponent(request.params.id) : 0;
					reply('API Display Edit/Add '+ id);
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