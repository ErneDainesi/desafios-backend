document.addEventListener("DOMContentLoaded", () => {
	const socket = io();
	const productTemplate = document.querySelector("#products-template");
	const toRender = document.querySelector("#to-render");
	const submitBtn = document.querySelector("#products-submit");

	const agregarProducto = _ => {
		const title = document.querySelector("#product-name").value;
		const price = document.querySelector("#product-price").value;
		const thumbnail = document.querySelector("#product-thumbnail").value;
		const product = {title, price, thumbnail};
		socket.emit("submit-form", product);
	};

	socket.on("user-connected", data => {
		if (data.length > 0) {
			const template = ejs.compile(productTemplate.innerHTML);
			toRender.innerHTML = template({productos: data, hayProductos: true});
		}
	});

	socket.on("user-submit-form", data => {
		const template = ejs.compile(productTemplate.innerHTML);
		toRender.innerHTML = template({productos: data.productos, hayProductos: data.hayProductos});
	});

	submitBtn.addEventListener("click", e => {
		e.preventDefault();
		agregarProducto();
	});
});
