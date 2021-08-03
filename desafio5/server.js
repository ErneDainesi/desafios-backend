const http = require('http');

const generarIntAleatorio = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

const generarFloatAleatorio = (min, max) => {
	return Math.random() * (max - min) + min;
}

const server = http.createServer((req, res) => {
	const producto = {
		id: generarIntAleatorio(1, 11),
		title: `Producto ${generarIntAleatorio(1, 11)}`,
		price: generarFloatAleatorio(0.00, 9999.99),
		thumbnail: `Foto ${generarIntAleatorio(1, 11)}`
	}
	res.end(JSON.stringify(producto));
})

server.listen(8080, () => {
	console.info("Tu servidor esta listo");
})
