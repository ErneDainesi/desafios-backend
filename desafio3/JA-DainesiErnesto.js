
const fin = cantidadDePalabras => console.log(`Proceso completo con ${cantidadDePalabras} palabras`);

const mostrarPalabras = (text, time = 1000, callback) => {
	textArray = text.split(' ');
	i = 0
	let interval = setInterval(() => {
		console.log(textArray[i]);
		i++;
		if (i === textArray.length) {
			clearInterval(interval);
			callback(textArray.length)
		}
	}, time)
}

mostrarPalabras("hola como estas", 2000, (respuesta1) => {
	mostrarPalabras("Mi nombre y apellido es Ernesto Dainesi", 2000, (respuesta2) => {
		mostrarPalabras("Tercer desafio curso coderhouse backend", 2000, (respuesta3) => {
			fin(respuesta1 + respuesta2 + respuesta3);
		})
	})
});
