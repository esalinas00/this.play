(function () {
	'use strict';

	var controllersModule = require('./_index');

	/**
	 * @ngInject
	 */
	var login_ctrl = function ($scope) {
		// Form Data
		$scope.formData = {};

		$scope.process_form = function() {
			console.log('success!');
		};
	};
	// controllersModule.controller('loginCtrl', login_ctrl);
	module.exports = login_ctrl;

})();