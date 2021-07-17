class User {
	constructor(name, lastName, books, pets) {
		this.name = name;
		this.lastName = lastName;
		this.books = books;
		this.pets = pets;
	}
	getFullName() {
		return `${this.name} ${this.lastName}`;
	}

	addPet(pet) {
		this.pets.push(pet);
	}

	getPets() {
		return this.pets.length;
	}

	addBook(book, author) {
		this.books.push({name: book, author: author});
	}

	getBooks() {
		return this.books.map(book => {return book.name});
	}
}


// Creo variables que voy a usar para probar
let user1Books = [
	{
		name: "Lord of the Rings",
		author: "J. R. R. Tolkien"
	},
	{
		name: "Harry Potter",
		author: "J. K. Rowling"
	}
]

let user1Pets = ["Napoleon", "Enzo", "Chewbacca"];

// Declaro una instancia de User
const user1 = new User("Ernesto", "Dainesi", user1Books, user1Pets);

// Muestro nombre completo
console.log(user1.getFullName());

// Agrego una mascota y muestro el array por pantalla
user1.addPet("Yoda");
console.log(user1.pets);

// Muestro la cantidad de mascotas del usuario
console.log(user1.getPets());

// Agrego un libro y muestro el array de nombres de los libros
user1.addBook("1984", "George Orwell");
console.log(user1.getBooks());
