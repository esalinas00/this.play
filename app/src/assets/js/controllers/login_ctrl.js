(function () {
    'use strict';

	var controllersModule = require('./_index');

	/**
	 * @ngInject
	 */
	var form_ctrl = function ($scope) {
		// Form Data
		$scope.formData = {};

		$scope.process_form = function() {
			console.log('success!');
		};
	};
	controllersModule.controller('loginCtrl', form_ctrl);

})();