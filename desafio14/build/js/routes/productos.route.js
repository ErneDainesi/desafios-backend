"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var returnRouter = function returnRouter(io) {
  var productos = [];
  io.on('connection', function (socket) {
    console.log("New connection on socket ".concat(socket.id));
    io.emit("user-connected", productos);
    socket.on("submit-form", function (data) {
      productos.push(data);
      io.emit("user-submit-form", {
        productos: productos,
        hayProductos: productos.length > 0
      });
    });
  });
  router.get('/', function (req, res) {
    res.render('pages/productos', {});
  });
  router.get('/vista', function (req, res) {
    res.render("pages/vista", {
      productos: productos,
      hayProductos: productos.length > 0
    });
  });
  router.get('/:id', function (req, res) {
    var idProducto = req.params.id;

    if (!productos[idProducto - 1]) {
      res.json({
        error: 'producto no encontrado'
      });
    } else {
      res.json(productos[idProducto - 1]);
    }
  });
  router.post('/', function (req, res) {
    console.log("POST request");

    var producto = _objectSpread(_objectSpread({}, req.body), {}, {
      id: productos.length + 1
    });

    productos.push(producto);
    res.redirect('/');
  });
  router.put('/:id', function (req, res) {
    console.log("PUT request");
    var id = req.params.id;
    productos[id - 1] = req.body;
    res.send(productos[id - 1]);
  });
  router["delete"]('/:id', function (req, res) {
    console.log("DELETE request");
    var productId = req.params.id;
    var deletedProduct = productos.splice(productId - 1, 1);
    res.send(deletedProduct[0]);
  });
  return router;
};

module.exports = returnRouter;