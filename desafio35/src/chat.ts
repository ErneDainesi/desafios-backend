import app from "./app";
import {Socket} from 'socket.io';
import client from './sms';
import {ChatMessage} from './models/SocketData';
import logger from "./logger/winston";

const http = require('http').Server(app);
const io = require('socket.io')(http);
const messages: Array<ChatMessage> = [];

const messageHasAdminWord = (message: string) => {
	const messageArray = message.split(' ');
	return messageArray.includes('administrador');
};

const sendSmsIfNeeded = (data: ChatMessage) => {
	const {email, message} = data;
	if (!messageHasAdminWord(message)) {
		return;
	}
	const body = `El usuario con mail ${email} envio un mensaje`;
	client.messages.create({
		body,
		from: '+12563776491',
		to: '+5401130036100'
	})
		.then(() => logger.info('SMS sent to admin'))
		.catch((err) => logger.error(err))
};

io.on('connection', (socket: Socket) => {
	socket.emit("new-chat-user", messages);
	socket.on("new-message", (data: ChatMessage) => {
		sendSmsIfNeeded(data);
		messages.push(data);
		io.sockets.emit("show-new-message", messages);
	});
});

export default io;

