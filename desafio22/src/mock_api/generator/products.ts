import faker from 'faker';

faker.locale = 'es';

export const getProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.datatype.number(),
        price: faker.commerce.price()
    }
}