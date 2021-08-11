const fs = require('fs');

class Archivo {
	constructor(nombreArchivo) {
		this.nombre = nombreArchivo;
	}

	async leer() {
		try {
			const archivo = await fs.promises.readFile(this.nombre, "utf-8");
			console.log(archivo);
		} catch (err) {
			console.log([]);
			await fs.promises.writeFile(this.nombre, JSON.stringify([]));
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
			const json = await fs.promises.readFile(this.nombre, "utf-8");
			const data = JSON.parse(json.toString());
			data.push({...producto, id: data.length + 1});
			await fs.promises.writeFile(this.nombre, JSON.stringify(data, null, '\t'));
		} catch (err) {
			await fs.promises.writeFile(this.nombre, JSON.stringify([{...producto, id: 1}]))
		}
	}
}

const a = new Archivo("./prueba.json");
a.guardar({title: 'Escuadra', price: 123.45, thumbnail: "www.google.com"});
a.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});
a.leer();
a.borrar();
