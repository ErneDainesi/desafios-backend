import {Request, Response} from "express";
import {generateRandomNumbers} from '../lib/random';
import {fork} from "child_process";
import logger from "../logger/winston";

export const randoms = (req: Request, res: Response) => {
	// No esta encontrando el archivo random.ts
	// const child = fork('../lib/random');
	// child.send(req.query);
	// child.on('message', (result) => {
	//     res.end(result);
	// });

	const amountToGenerate: number = req.query.amount ? +req.query.amount : 100000000;
	const randomNumbers: any = generateRandomNumbers(amountToGenerate);
	logger.info('Random numbers generated');
	res.send(randomNumbers);
}
