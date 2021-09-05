"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var productos = require('./routes/productos.route')(io);
var PORT = 8080;
var messages = [];
app.use(express_1.default.static('public'));
app.use('/productos', productos);
app.get('/', function (req, res) {
    res.send('index.html');
});
io.on('connection', function (socket) {
    socket.emit("new-chat-user", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("show-new-message", messages);
    });
});
app.set('view engine', 'ejs');
http.listen(PORT, function () {
    console.log("JS Server on port " + PORT);
});
