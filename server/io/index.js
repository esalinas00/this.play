// Dependencies =================================
	var SocketIO = require('socket.io'),
		io_handler,
		images = [
			"https://unsplash.imgix.net/photo-1423439793616-f2aa4356b37e?fit=crop&fm=jpg&h=600&q=75&w=1050",
			"https://unsplash.imgix.net/photo-1422513391413-ddd4f2ce3340?fit=crop&fm=jpg&q=75&w=1050",
			"https://ununsplash.imgix.net/photo-1422022098106-b3a9edc463af?fit=crop&fm=jpg&q=75&w=1050",
			"https://ununsplash.imgix.net/photo-1415871989540-61fe9268d3c8?fit=crop&fm=jpg&q=75&w=1050"
		],
		images_len = images.length,
		index = 0,
		conns = 0;

// IO =================================
	io_handler = function(server) {
		var io = SocketIO.listen(server.listener);
		io.sockets.on('connection', function (socket) {
			console.log('new conn');
			conns++;
			io.sockets.emit('welcome', {img_url: get_img().img_url, conns: conns});

			socket.on('disconnect', function (event) {
				console.log('disconn');
				conns--;
			});

			// Incoming Events
			socket.on('client:click', function (data) {
				console.log(data);
				console.log(1);
			});
			socket.on('client:next', function (data) {
				index = ((index+1)>(images_len-1))?0:index + 1;
				io.sockets.emit('server:next', get_img());
			});
			socket.on('client:prev', function (data) {
				index = ((index-1)<0)?(images_len-1):index - 1;
				io.sockets.emit('server:prev', get_img());
			});
		});

		var get_img = function () {
			return { img_url: images[index] };
		};
	};

// Expose Module ================================
	module.exports = io_handler;