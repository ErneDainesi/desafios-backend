const express = require('express');
const { normalizeData } = require('./normalizr');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./routes/productos.route')(io);
const PORT = 8080;
const messages = [];

app.use(express.static('./public'));
app.use('/productos', productos);

app.get('/', (req, res) => {
	res.send("index.html");
});

io.on('connection', socket => {
	socket.emit("new-chat-user", messages);
	socket.on("new-message", data => {
		const normalizedMessage = normalizeData(data);
		messages.push(normalizedMessage);
		io.sockets.emit("show-new-message", messages);
	});
})

app.set('view engine', 'ejs');

const server = http.listen(PORT, () => {
	console.log(`Escuchando en puerto: ${PORT}`);
});

