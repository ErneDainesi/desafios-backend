document.addEventListener("DOMContentLoaded", () => {
	const socket = io();
	const productTemplate = document.querySelector("#products-template");
	const chatTemplate = document.querySelector("#chat-template");
	const toRender = document.querySelector("#to-render");
	const renderChat = document.querySelector("#render-chat");
	const submitProductBtn = document.querySelector("#products-submit");
	const submitMessageBtn = document.querySelector("#send-chat");

	const agregarProducto = _ => {
		const title = document.querySelector("#product-name").value;
		const price = document.querySelector("#product-price").value;
		const thumbnail = document.querySelector("#product-thumbnail").value;
		const product = {title, price, thumbnail};
		socket.emit("submit-form", product);
	};

	const agregarMensaje = _ => {
		const email = document.querySelector("#chat-email").value;
		const mensaje = document.querySelector("#chat-message").value;
		const currentDate = new Date();
		const timeAndDate =
			`${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
		const message = {email, mensaje, timeAndDate};
		socket.emit("new-message", message);
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

	socket.on("show-new-message", data => {
		const template = ejs.compile(chatTemplate.innerHTML);
		renderChat.innerHTML = template({messages: data});
	});

	socket.on("new-chat-user", data => {
		const template = ejs.compile(chatTemplate.innerHTML);
		renderChat.innerHTML = template({messages: data});
	})

	submitProductBtn.addEventListener("click", e => {
		e.preventDefault();
		agregarProducto();
	});

	submitMessageBtn.addEventListener("click", e => {
		e.preventDefault();
		agregarMensaje();
	});
});
