const express = require('express');
const productos = require("./routes/productos.route");
const app = express();
const PORT = 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use('/productos', productos);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render("pages/index", {});
})

app.listen(PORT, () => {
	console.log(`Escuchando en puerto ${PORT}`)
})

