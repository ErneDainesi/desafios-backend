const {options} = require("./sqlite3");
const knex = require("knex")(options);

const products = [
	{name: 'Fideos', category: 'Harina', stock: 20},
	{name: 'Leche', category: 'Lacteos', stock: 30},
	{name: 'Crema', category: 'Lacteos', stock: 15},
];

// Creo la db con la table products
(async () => {
	try {
		await knex.schema
			.dropTableIfExists('products')
			.createTable('products', table => {
				table.increments("id").notNullable();
				table.string("name", 15);
				table.string("category");
				table.integer("stock");
			});
		await knex('products').insert(products);
	} catch (err) {
		console.error(err);
	}
})();

// realizo operaciones sobre la tabla creada
(async () => {
	try {
		await knex.from('products').where({id: '1'}).del();
		await knex.from('products').where({id: '2'}).update({stock: 45});
		const tableData = await knex.from('products').select("*");
		console.log(tableData);
	} catch (err) {
		console.error(err);
	} finally {
		knex.destroy();
	}
})();
