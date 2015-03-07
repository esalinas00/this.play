(function() {
	"use strict";

	/**
	 * @ngInject
	 */
	function on_run($rootScope, Config) {

		$rootScope.app_name = Config.app_name;
		$rootScope.title = Config.app_name;

		// Manages vars by request
		$rootScope.$on('$stateChangeSuccess', function (event, toState) {
			// $rootScope.title = toState.data.title;
		});

	}

	module.exports = on_run;
})();