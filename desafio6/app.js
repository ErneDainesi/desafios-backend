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
			const file = this.leer();
			data.push({...producto, id: file.length + 1});
			await fs.promises.writeFile(this.nombre, JSON.stringify(file));
		} catch {
			await fs.promises.writeFile(this.nombre, JSON.stringify([{...producto, id: 1}]))
		}
	}
}


/* Pruebo con archivo A*/
const archivoA = new Archivo("./productosA.txt");

// Leo el archivo, como en un principio no existe, lo crea
// deberia mostrar []
console.log(archivoA.leer());

// Guardo dos objetos
archivoA.guardar({title: 'Escuadra', price: 123.45, thumbnail: "www.google.com"});
archivoA.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});

// Leo de nuevo el archivo
// deberia mostrar array con los dos objetos
console.log(archivoA.leer());

/* Pruebo con archivo B */
const archivoB = new Archivo("./productosB.txt");

// Leo el archivo, como en un principio no existe, lo crea
// deberia mostrar []
console.log(archivoB.leer());

// Guardo un producto
archivoA.guardar({title: 'Tijera', price: 123.45, thumbnail: "www.google.com"});

// Muestro el archivo modificado
console.log(archivoB.leer());

// Elimino el archivo, no debería estar mas en este directorio
archivoB.borrar();
