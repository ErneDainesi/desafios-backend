document.addEventListener('DOMContentLoaded', () => {
	const socket = io.connect();
	socket.on('prueba', data => {
		console.log(data)
	})
})
