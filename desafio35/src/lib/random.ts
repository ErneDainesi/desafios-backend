import {MAX_RANDOM_RANGE, MIN_RANDOM_RANGE} from "../constants";

export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

export const generateRandomNumbers = (amountToGenerate: number) => {
	const result: any = {};
	for (let i = 0; i < amountToGenerate; i++) {
		let randomNumber: string = getRandomNumber(MIN_RANDOM_RANGE, MAX_RANDOM_RANGE).toString();
		if (result[randomNumber]) {
			result[randomNumber] += 1;
		} else {
			result[randomNumber] = 1;
		}
	}
	return result;
}

// process.on('message', (query: any) => {
//     const amountToGenerate: number = query.amount ? +query.amount : 100000000;
//     const randomNumbers: any = generateRandomNumbers(amountToGenerate);
//     process.send(randomNumbers);
// });

