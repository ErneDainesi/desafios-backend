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
		const name = document.querySelector("#chat-name").value;
		const lastName = document.querySelector("#chat-lastname").value;
		const alias = document.querySelector("#chat-alias").value;
		const age = document.querySelector("#chat-age").value;
		const email = document.querySelector("#chat-email").value;
		const avatar = document.querySelector("#chat-avatar").value;
		const text = document.querySelector("#chat-message").value;
		const currentDate = new Date();
		const timeAndDate =
			`${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
		const message = {
			author: {
				id: email,
				name,
				lastName,
				age,
				alias,
				avatar
			},
			text,
			timeAndDate
		}
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
		const denormalizedMessages = denormalizeData(data);
		renderChat.innerHTML = template({messages: denormalizedMessages});
	});

	socket.on("new-chat-user", data => {
		const template = ejs.compile(chatTemplate.innerHTML);
		const denormalizedMessages = denormalizeData(data);
		renderChat.innerHTML = template({messages: denormalizedMessages});
	})

	submitProductBtn.addEventListener("click", e => {
		e.preventDefault();
		agregarProducto();
	});

	submitMessageBtn.addEventListener("click", e => {
		e.preventDefault();
		console.log("Click");
		agregarMensaje();
	});
});
