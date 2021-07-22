"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operacion = void 0;
class Operacion {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    sumar() {
        return this.num1 + this.num2;
    }
    restar() {
        return this.num1 - this.num2;
    }
}
exports.Operacion = Operacion;
