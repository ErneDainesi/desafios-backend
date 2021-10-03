import { NextFunction, query, Request, Response } from "express";
import { getProduct } from "../generator/products";

export const showRandomProducts = (req: Request, res: Response) => {
    let amount = req.params.amount ? +req.params.amount : 10;
    if (+amount === 0) {
        res.json({message: "No hay productos"});
        return;
    }
    const products = [];
    for (let i = 0; i < +amount; i++) {
        products.push(getProduct());
    }
    res.json(products);
}