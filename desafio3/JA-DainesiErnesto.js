
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

let texto = "hola como estas";
let texto2 = "Mi nombre y apellido es Ernesto Dainesi";
let texto3 = "Tercer desafio curso coderhouse backend";

mostrarPalabras(texto, 2000, (respuesta1) => {
	mostrarPalabras(texto2, 2000, (respuesta2) => {
		mostrarPalabras(texto3, 2000, (respuesta3) => {
			fin(respuesta1 + respuesta2, respuesta3);
		})
	})
});
