const fs = require('fs');

class Archivo {
	constructor(nombreArchivo) {
		this.nombre = nombreArchivo;
	}

	async leer() {
		try {
			const archivo = await fs.promises.readFile(this.nombre, "utf-8");
			return JSON.parse(archivo.toString());
		} catch (err) {
			await fs.promises.writeFile(this.nombre, JSON.stringify([]));
			const archivo = await fs.promises.readFile(this.nombre, "utf-8");
			return JSON.parse(archivo.toString());
		}
	}

	async borrar() {
		try {
			await fs.promises.unlink(this.nombre);
			console.log("Archivo eliminado");
		} catch (err) {
			throw new Error(err);
		}
	}

	async guardar(producto) {
		try {
			const data = await this.leer();
			data.push({...producto, id: data.length + 1});
			await fs.promises.writeFile(this.nombre, JSON.stringify(data));
		} catch (err) {
			await fs.promises.writeFile(this.nombre, JSON.stringify([{...producto, id: 1}]))
		}
	}
}

async function tests() {
	const archivo = new Archivo("./productos.txt");
	archivo.leer()
		.then(data => console.log(data))
	await archivo.guardar({title: 'Escuadra', price: 123.45, thumbnail: "www.google.com"});
	archivo.leer()
		.then(data => console.log(data));
	await archivo.guardar({title: 'Tenedor', price: 123.45, thumbnail: "www.google.com"});
	await archivo.leer()
		.then(data => console.log(data));
	archivo.borrar();
}

tests();
