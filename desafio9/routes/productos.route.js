import express from 'express';

const router = express.Router();

const productos = [];

router.get('/', (req, res) => productos.length > 0 ? res.json(productos) : res.json({error: 'no hay productos cargados'}));

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
	res.json(producto);
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
