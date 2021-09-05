import express from "express";
import {Socket} from 'socket.io';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./routes/productos.route')(io);
const PORT: number = 8080;
const messages: string[] = [];

app.use(express.static('public'));
app.use('/productos', productos);

app.get('/', (req, res) => {
	res.send('index.html');
});

io.on('connection', (socket: Socket) => {
	socket.emit("new-chat-user", messages);
	socket.on("new-message", (data: string) => {
		messages.push(data);
		io.sockets.emit("show-new-message", messages);
	});
});

app.set('view engine', 'ejs');

http.listen(PORT, () => {
	console.log(`JS Server on port ${PORT}`);
});

