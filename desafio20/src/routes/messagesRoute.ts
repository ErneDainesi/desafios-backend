import { IRouter, Router, Request, Response } from "express";
import messagesSchema from "../schemas/messagesSchema";

const router: IRouter = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({message: "Works"});
});

router.post('/', async (req: Request, res: Response) => {
    const newMessage = new messagesSchema(req.body);
    await newMessage.save();
    res.json({message: "Message Saved"});
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) res.json({message: "Need an ID"});
    const message = await messagesSchema.findById(id);
    console.log("mensaje: ", message);
    res.json({message});
});

export default router;