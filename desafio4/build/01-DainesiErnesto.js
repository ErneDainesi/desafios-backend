"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#inp");
    const label = document.querySelector("#texto-espejado");
    const observable = rxjs_1.fromEvent(input, "keyup");
    observable.subscribe(e => {
        const text = e.target.value;
        label.innerText = text.split('').reverse().join('');
    });
});
