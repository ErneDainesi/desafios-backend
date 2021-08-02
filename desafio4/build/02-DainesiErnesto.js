const {fromEvent} = rxjs;
const {map} = rxjs.operators;

const input = document.querySelector("#inp");
const label = document.querySelector("#texto-espejado");

const observable = fromEvent(input, "keyup");
const text = observable.pipe(map(e => e.target.value.split('').reverse().join('')));
const subscription = text.subscribe(e => {
	let inputText = e.split('').reverse().join('');
	if (inputText === "error") {
		desuscripcion(() => console.error(error));
	} else if (inputText === "complete") {
		desuscripcion(() => console.log("Completado"));
	}
	label.innerHTML = e;
})

const desuscripcion = fin => {
	label.innerHTML = "";
	input.value = "";
	input.disabled = true;
	fin();
	subscription.unsubscribe();
}

setTimeout(() => desuscripcion(() => console.log("Se agotó el tiempo")), 30000);
