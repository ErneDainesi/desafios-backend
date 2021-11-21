import {Request, Response} from "express";

export const chatPage = (req: Request, res: Response) => {
	res.send('index.html');
};

