import * as fs from 'fs';

class Archivo {
	nombre: string;
	constructor(nombreArchivo: string) {
		this.nombre = nombreArchivo;
	}

	async leer() {
		try {
			const archivo = await fs.promises.readFile(this.nombre, "utf-8");
			return archivo;
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async borrar() {
		try {
			await fs.promises.unlink(this.nombre);
		} catch (err) {
			console.error(err);
		}
	}

	async guardar(producto: object) {
		try {
			const json = await fs.promises.readFile(this.nombre);
			const data = JSON.parse(json.toString("utf-8"));
			data.push({...producto, id: data.length + 1});
			try {
				await fs.promises.writeFile(this.nombre, JSON.stringify(data));
			} catch (err) {
				throw new Error(err);
			}
		} catch (err) {
			console.error(err);
			try {
				await fs.promises.writeFile(this.nombre, JSON.stringify([{...producto, id: 1}]))
			} catch (err) {
				throw new Error(err);
			}
		}
	}
}

const a = new Archivo("./prueba.json");
a.guardar({title: 'Escuadra', price: 123.45, thumbnail: "www.google.com"});
a.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});
