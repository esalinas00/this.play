(function () {
    'use strict';

	var angular = require('angular');

	module.exports = angular.module('app.factory', []);

	// Define the list of services here
	require('./socket_fact.js');
})();