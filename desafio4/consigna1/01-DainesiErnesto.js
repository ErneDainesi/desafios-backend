const {fromEvent} = rxjs;

const input = document.querySelector("#inp");
const label = document.querySelector("#texto-espejado");
const observer = {
	next: function (e) {
		const text = e.target.value;
		if (text === "error") {
			this.error("error");
		} else if (text === "complete") {
			this.complete();
		} else {
			label.innerText = text.split('').reverse().join('');
		}
	},
	error: function (error) {
		desuscripcion(() => console.error(error));
	},
	complete: function () {
		desuscripcion(() => console.log("Completado"));
	}
}

const observable = fromEvent(input, "keyup");
const subscription = observable.subscribe(observer);

const desuscripcion = fin => {
	label.innerHTML = "";
	input.value = "";
	input.disabled = true;
	fin();
	subscription.unsubscribe();
}

setTimeout(() => desuscripcion(() => console.log("Se agotó el tiempo")), 30000);
