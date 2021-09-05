"use strict";

var express = require('express');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var productos = require('./routes/productos.route')(io);

var PORT = 8080;
var messages = [];
app.use(express["static"]('public'));
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
http.listen(PORT, function (_) {
  console.log("JS Server on port ".concat(PORT));
});