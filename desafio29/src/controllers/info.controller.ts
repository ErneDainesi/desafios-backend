import {Request, Response} from "express";

export const getInfo = (req: Request, res: Response) => {
	const info = {
		params: process.argv,
		platform: process.platform,
		nodejs: process.version,
		memoryUsage: process.memoryUsage(),
		execPath: process.execPath,
		id: process.pid,
		currentDirectory: process.cwd()
	};
	res.json(info);
}

