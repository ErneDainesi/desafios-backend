import {Request, Response} from "express";
import {MAX_RANDOM_RANGE, MIN_RANDOM_RANGE} from "../constants";
import {getRandomNumber} from "../lib/random";

export const randoms = (req: Request, res: Response) => {
	const amountToGenerate: number = req.query.amount ? +req.query.amount : 100000000;
	const result: any = {};
	for (let i = 0; i < amountToGenerate; i++) {
		let randomNumber: string = getRandomNumber(MIN_RANDOM_RANGE, MAX_RANDOM_RANGE).toString();
		if (result[randomNumber]) {
			result[randomNumber] += 1;
		} else {
			result[randomNumber] = 1;
		}
	}
	res.json(result);
}
