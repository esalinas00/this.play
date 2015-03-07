// @main
// Luis Matute
// Feb-15

(function () {
// Common Dependencies ==========================
	require('angular');
	require('angular-ui-router');
	require('angular-touch');

// Create and Bootstrap Angular App =============
	angular.element(document).ready(function(){
		var requires = ['ui.router','ngTouch'];
		window.app = angular.module('app', requires);

		require('./controllers/_index.js');
		require('./services/_index.js');

		angular.module('app').constant('Config', require('./config'));

		angular.module('app').config(require('./routes'));

		angular.module('app').run(require('./on_run'));

		angular.bootstrap(document, ['app']);
	});
})();