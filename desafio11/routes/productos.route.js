const express = require('express');

const router = express.Router();

const productos = [];

router.get('/', (req, res) => {
	res.render('pages/productos', {});
});

router.get('/vista', (req, res) => {
	res.render("pages/vista", {
		productos,
		hayProductos: productos.length > 0
	});
});

router.get('/producto/:id', (req, res) => {
	const idProducto = req.params.id;
	if (!productos[idProducto - 1]) {
		res.json({error: 'producto no encontrado'})
	} else {
		res.json(productos[idProducto - 1]);
	}
});

router.post('/guardar', (req, res) => {
	console.log("POST request");
	const producto = {...req.body, id: productos.length + 1};
	productos.push(producto);
	res.redirect('/productos');
});

router.put('/update/:id', (req, res) => {
	console.log("PUT request");
	const id = req.params.id;
	productos[id - 1] = req.body;
	res.send(productos[id - 1]);
});

router.delete('/delete/:id', (req, res) => {
	console.log("DELETE request");
	const productId = req.params.id;
	const deletedProduct = productos.splice(productId - 1, 1);
	res.send(deletedProduct[0]);
});

module.exports = router;
