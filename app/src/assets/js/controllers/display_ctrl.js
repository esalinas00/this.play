(function () {
	'use strict';

	var display_ctrl = function ($scope, $stateParams, socket) {
		$scope.display_style = {};
		$scope._id = socket.room_id = $stateParams.display_id;

		$scope.le_click = function($event) {
			socket.emit('client:click', { "event": $event });
			return false;
		};
		$scope.next = function($event) {
			socket.emit('client:next', {}, function() {});
		};
		$scope.prev = function($event) {
			socket.emit('client:prev', {}, function() {});
		};

		// Incoming socket messages
			socket.on('welcome', function (data) {
				next_img(data.img_url);
			});
			socket.on('server:next', function (data) {
				next_img(data.img_url);
			});
			socket.on('server:prev', function (data) {
				next_img(data.img_url);
			});

		// Outgoing socket messages
			socket.emit('new_user', { room_id: socket.room_id }, function() {});


		var next_img = function (img_url) {
			$scope.display_style = { "background-image": "url("+img_url+")" };
		};
	};
	module.exports = display_ctrl;
})();