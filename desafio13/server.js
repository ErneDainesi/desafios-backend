const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', socket => {
	console.log('Nueva conexion');
	socket.emit("prueba", "Esto es una prueba");
})

server.listen(8080, _ => {
	console.log('Servidor escuchando en http://localhost:8080');
})
