import express from 'express';

const app = express();
const productos = require("./routes/productos.route");
const handlebars = require("express-handlebars");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/productos', productos);

app.engine("hbs", handlebars({
	extname: ".hbs",
	defaultLayout: "index.hbs",
	layoutsDir: __dirname + "/views/layouts/",
	partialsDir: __dirname + "/views/partials/"
}))

app.set("views", __dirname + "/views/layouts");
app.set("view engine", "hbs");

app.get('/', (req, res) => {
	res.send('<h1>Desafio 10</h1>');
})

app.listen(PORT, () => {
	console.log("Servidor inicializado en puerto 8080");
})

