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
			await fs.promises.writeFile(this.nombre, JSON.stringify(data));
		} catch {
			await fs.promises.writeFile(this.nombre, JSON.stringify([{...producto, id: 1}]))
		}
	}
}


/* Pruebo con archivo A*/
const archivoA = new Archivo("./productosA.json");

// Leo el archivo, como en un principio no existe, lo crea
// deberia mostrar []
archivoA.leer();

// Guardo dos objetos
archivoA.guardar({title: 'Escuadra', price: 123.45, thumbnail: "www.google.com"});
archivoA.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});

// Leo de nuevo el archivo
// deberia mostrar array con los dos objetos
archivoA.leer();

/* Pruebo con archivo B */
const archivoB = new Archivo("./productosB.json");

// Leo el archivo, como en un principio no existe, lo crea
// deberia mostrar []
archivoB.leer();

// Guardo un producto
archivoA.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});

// Elimino el archivo, no debería estar mas en este directorio
archivoB.borrar();
