const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

const totalVisitas = {items: 0, item: 0};

const leerArchivo = () => {
	try {
		const archivo = fs.readFileSync('./productos.txt', "utf-8");
		return JSON.parse(archivo);
	} catch (err) {
		throw new Error(err);
	}
}
const getRandomIndex = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

const server = app.listen(PORT, () => {
	console.log(`Servidor inicializado en puerto ${server.address().port}`);
})

app.get('/items', (req, res) => {
	console.log("Items request");
	const data = leerArchivo();
	const productos = [];
	let cantidad = 0;
	for (let item of data) {
		productos.push(item)
		cantidad++;
	}
	res.json({items: productos, cantidad: cantidad});
	totalVisitas["items"]++;
})

app.get('/item-random', (req, res) => {
	console.log("Random item request");
	const data = leerArchivo();
	res.json(data[getRandomIndex(0, data.length - 1)]);
	totalVisitas["item"]++;
})

app.get('/visitas', (req, res) => {
	console.log("Visitas request");
	res.json(totalVisitas);
})
