(function () {
    'use strict';

	var angular = require('angular');
	module.exports = angular.module('app.controllers', []);

	// Define the list of controllers here
	require('./login_ctrl.js');
})();