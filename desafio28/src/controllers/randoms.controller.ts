import {Request, Response} from "express";
import {fork} from "child_process";

export const randoms = (req: Request, res: Response) => {
	// No esta encontrando el archivo random.ts
	const child = fork('../lib/random');
	child.send(req.query);
	child.on('message', (result) => {
		res.end(result);
	});
}
