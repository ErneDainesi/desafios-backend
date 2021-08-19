import express from 'express';

const productos = require("./routes/productos.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/productos', productos);

const PORT = 8080;

app.listen(PORT, () => {
	console.log("Servidor inicializado en puerto 8080");
})

