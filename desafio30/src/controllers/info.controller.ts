import {Request, Response} from "express";
import {cpus} from 'os';

export const getInfo = (req: Request, res: Response) => {
	const info = {
		params: process.argv,
		platform: process.platform,
		nodejs: process.version,
		memoryUsage: process.memoryUsage(),
		execPath: process.execPath,
		id: process.pid,
		currentDirectory: process.cwd(),
		cpus: cpus().length

	};
	res.json(info);
}

