
const fin = cantidadDePalabras => console.log(`Proceso completo con ${cantidadDePalabras} palabras`);

const mostrarPalabras = (textArray, indx, time = 1000, callback) => {
	if (indx === textArray.length) {
		callback(indx);
	} else {
		setTimeout(() => {
			console.log(textArray[indx]);
			mostrarPalabras(textArray, indx + 1, time, callback);
		}, time);
	}
}

const main = () => {
	let texto = "hola como estas";
	let texto2 = "Mi nombre y apellido es Ernesto Dainesi";
	let texto3 = "Tercer desafio curso coderhouse backend";
	mostrarPalabras(texto.split(' '), 0, 2000, fin);
	mostrarPalabras(texto2.split(' '), 0, 2000, fin);
	mostrarPalabras(texto3.split(' '), 0, 2000, fin);
}

main();
