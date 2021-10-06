const express = require('express');
const router = express.Router();

const returnRouter = io => {
	const productos = [];

	io.on('connection', socket => {
		console.log(`New connection on socket ${socket.id}`);
		io.emit("user-connected", productos);
		socket.on("submit-form", data => {
			productos.push(data);
			io.emit("user-submit-form", {
				productos,
				hayProductos: productos.length > 0
			});
		});
	});

	router.get('/', (req, res) => {
		res.render('pages/productos', {});
	});

	router.get('/vista', (req, res) => {
		res.render("pages/vista", {
			productos,
			hayProductos: productos.length > 0
		});
	});

	router.get('/:id', (req, res) => {
		const idProducto = req.params.id;
		if (!productos[idProducto - 1]) {
			res.json({error: 'producto no encontrado'})
		} else {
			res.json(productos[idProducto - 1]);
		}
	});

	router.post('/', (req, res) => {
		console.log("POST request");
		const producto = {...req.body, id: productos.length + 1};
		productos.push(producto);
		res.redirect('/');
	});

	router.put('/:id', (req, res) => {
		console.log("PUT request");
		const id = req.params.id;
		productos[id - 1] = req.body;
		res.send(productos[id - 1]);
	});

	router.delete('/:id', (req, res) => {
		console.log("DELETE request");
		const productId = req.params.id;
		const deletedProduct = productos.splice(productId - 1, 1);
		res.send(deletedProduct[0]);
	});

	return router;
};

module.exports = returnRouter;
