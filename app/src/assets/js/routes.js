(function () {
    'use strict';

	// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, Config) {
		$stateProvider
			.state('login',{
				url: '/login',
				templateUrl: Config.tpl('login'),
				controller: require('./controllers/login_ctrl.js')
			})
			.state('app',{
				url: '/app',
				templateUrl: Config.tpl('app')
				// ,
				// controller: require('./controllers/form_ctrl.js')
			})
			.state('display',{
				url: '/display',
				templateUrl: Config.tpl('display'),
				controller: require('./controllers/display_ctrl.js')
			});

		$urlRouterProvider.otherwise('/login');
		// $locationProvider.html5Mode(true);
	}

	module.exports = Routes;
})();