const operacionesParaTestear = [
	{num1: 2, num2: 2, op: "+"},
	{num1: 1, num2: -5, op: "+"},
	{num1: -1, num2: -5, op: "+"},
	{num1: 2, num2: 2, op: "-"},
	{num1: -24, num2: -2, op: "-"},
	{num1: 4, num2: 2, op: "-"},
]

async function operacion(num1:number, num2: number, op: string) {
	let {Operacion} = await import('./Operacion');
	let instOperacion = new Operacion(num1, num2);
	return op === "+" ? instOperacion.sumar() : instOperacion.restar();
}

const operaciones = (operacionesParaTestear: Array<{num1: number, num2: number, op: string}>) => {
	for (const opTest of operacionesParaTestear) {
		operacion(opTest.num1, opTest.num2, opTest.op)
		.then((resultado: number) => console.log(resultado))
		.catch(err => console.error(err));
	}
}

operaciones(operacionesParaTestear);
