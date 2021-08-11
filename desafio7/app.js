const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor inicializado en puerto ${server.address().port}`);
})

app.get('/items', (req, res) => {
	console.log("Items request");
	try {
		const file = fs.readSync("./productos.json", "utf-8");
		const data = JSON.parse(file.toString())
		res.send(data);
	} catch (err) {
		throw new Error(err);
	}
	res.json(productos.items);
})

app.get('/item-random', (req, res) => {
	console.log("Random item request");
})

app.get('/visitas', (req, res) => {
	console.log("Visitas request");
})
