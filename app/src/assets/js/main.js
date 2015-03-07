// @main
// Luis Matute
// Feb-15

(function () {
// Common Dependencies ==========================
	require('angular');
	require('angular-ui-router');
	require('./controllers/_index.js');

// Create and Bootstrap Angular App =============
	angular.element(document).ready(function(){
		var requires = ['ui.router'];
		window.app = angular.module('app', requires);

		angular.module('app').constant('Config', require('./config'));

		angular.module('app').config(require('./routes'));

		angular.module('app').run(require('./on_run'));

		angular.bootstrap(document, ['app']);
	});
})();