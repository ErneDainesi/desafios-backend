const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./routes/productos.route')(io);
const PORT = 8080;
const messages = [];

app.use(express.static('../../public'));
app.use('/productos', productos);

app.get('/', (req, res) => {
	res.send('index.html');
});

io.on('connection', socket => {
	socket.emit("new-chat-user", messages);
	socket.on("new-message", data => {
		messages.push(data);
		io.sockets.emit("show-new-message", messages);
	});
});

app.set('view engine', 'ejs');

http.listen(PORT, _ => {
	console.log(`JS Server on port ${PORT}`);
});
