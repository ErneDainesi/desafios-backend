import { Request, Response } from "express";
import messagesSchema from "../schemas/messagesSchema";

export const getOneMessage = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) res.json({message: "Need an ID"});
    const message = await messagesSchema.findById(id);
    console.log("mensaje: ", message);
    res.json({message});
}

export const saveMessage = async (req: Request, res: Response) => {
    const newMessage = new messagesSchema(req.body);
    await newMessage.save();
    res.json({message: "Message Saved"});
}