import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log("Servidor inicializado en puerto 8080");
})

const productos = [];

app.get('/', (req, res) => {
	res.send('<h1>Desafio 8</h1>');
})

app.get('/api/productos/listar', (req, res) => {
	if (productos.length > 0) {
		res.json(productos);
	} else {
		res.json({error: 'no hay productos cargados'});
	}
})

app.get('/api/productos/listar/:id', (req, res) => {
	const idProducto = req.params.id;
	if (!productos[idProducto - 1]) {
		res.json({error: 'producto no encontrado'})
	} else {
		res.json(productos[idProducto - 1]);
	}
})

app.post('/api/productos/guardar', (req, res) => {
	console.log("POST request");
	const producto = {...req.body, id: productos.length + 1};
	productos.push(producto);
	res.json(producto);
})

