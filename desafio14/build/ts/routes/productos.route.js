"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var returnRouter = function (io) {
    var productos = [];
    io.on('connection', function (socket) {
        console.log("New connection on socket " + socket.id);
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
        var idProducto = +req.params.id;
        if (!productos[idProducto - 1]) {
            res.json({ error: 'producto no encontrado' });
        }
        else {
            res.json(productos[idProducto - 1]);
        }
    });
    router.post('/', function (req, res) {
        console.log("POST request");
        var producto = __assign(__assign({}, req.body), { id: productos.length + 1 });
        productos.push(producto);
        res.redirect('/');
    });
    router.put('/:id', function (req, res) {
        console.log("PUT request");
        var id = +req.params.id;
        productos[id - 1] = req.body;
        res.send(productos[id - 1]);
    });
    router.delete('/:id', function (req, res) {
        console.log("DELETE request");
        var productId = +req.params.id;
        var deletedProduct = productos.splice(productId - 1, 1);
        res.send(deletedProduct[0]);
    });
    return router;
};
module.exports = returnRouter;
