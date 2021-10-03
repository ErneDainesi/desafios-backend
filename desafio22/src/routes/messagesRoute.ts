import { IRouter, Router, Request, Response } from "express";
import { getOneMessage, saveMessage } from "../controllers/messages";

const router: IRouter = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({message: "Messages"});
});

router.post('/', saveMessage);

router.get('/:id', getOneMessage);

export default router;