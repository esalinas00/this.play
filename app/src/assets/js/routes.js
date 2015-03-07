(function () {
    'use strict';

	// @ngInject ====================================
	function Routes($stateProvider, $locationProvider, $urlRouterProvider, Config) {
		$stateProvider
			.state('login',{
				url: '/login',
				templateUrl: Config.tpl('login'),
				controller: 'loginCtrl'
			})
			.state('app',{
				url: '/app',
				templateUrl: Config.tpl('app')
				// ,
				// controller: require('./controllers/form_ctrl.js')
			});
			// Step 1
				// .state('app.login', {
				// 	url: '/booking',
				// 	templateUrl: Config.tpl('app-login')
				// });

		$urlRouterProvider.otherwise('/login');
		// $locationProvider.html5Mode(true);
	}

	module.exports = Routes;
})();