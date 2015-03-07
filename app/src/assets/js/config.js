(function () {
    // Dependencies =================================
		var env = {
			"development": {
				"name": "src",
				"host": "localhost"
			},
			"production": {
				"name": "dist",
				"host": "localhost"
			}
		};

	// Exposing Settings ============================
		module.exports = {
			app_name: "",
			env: env[window.ENV || 'development'],
			tpl: function (view) {
				return '/views/'+view+'.html';
			}
		};
})();