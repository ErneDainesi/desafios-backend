"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const input = document.querySelector("#inp");
const label = document.querySelector("#texto-espejado");
const observable = rxjs_1.fromEvent(input, "keyup");
observable.subscribe((e) => {
    console.log(e);
    const target = e.target;
    let text = target.value;
    label.innerText = text.split('').reverse().join('');
});
