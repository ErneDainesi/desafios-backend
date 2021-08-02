import { fromEvent } from "rxjs";

document.addEventListener("DOMContentLoaded", () => {
	const input = document.querySelector("#inp");
	const label = document.querySelector("#texto-espejado");
		
	const observable = fromEvent(input as HTMLInputElement, "keyup");
	const subscription = observable.subscribe(e => {
		const text = (e.target as HTMLInputElement).value;
		(label as HTMLLabelElement).innerText = text.split('').reverse().join('');
	})
	subscription.unsubscribe();
})


