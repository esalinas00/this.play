(function () {
    'use strict';

	var servicesModule = require('./_index.js');
	var io = require('socket.io-client');
	/**
	 * @ngInject
	 */
	function SocketFactory($rootScope) {
		var socket = io.connect();
		var factory = {
			on: function(eventName, callback) {
				socket.on(eventName, function () {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},

			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};

		return factory;

	}

	app.factory('socket', SocketFactory);
})();