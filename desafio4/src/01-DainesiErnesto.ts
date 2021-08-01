import { fromEvent } from "rxjs";

const input = document.querySelector("#inp");
const label = document.querySelector("#texto-espejado");
    
const observable = fromEvent(input as HTMLInputElement, "keyup");
observable.subscribe((e: Event) => {
	console.log(e);
    const target = e.target as HTMLInputElement;
    let text = target.value;
    (label as HTMLLabelElement).innerText = text.split('').reverse().join('');
})
