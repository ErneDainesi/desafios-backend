import { NextFunction, Request, Response } from "express";
import { User, users } from "../users";

export const validateCredentials = (req: Request, res: Response, next: NextFunction) => {
    const userLogginIn: User = {...req.body};
    users.forEach((user: User) => {
        if (user.username === userLogginIn.username && user.password === userLogginIn.password) {
            return next();
        }
    });
    //return res.status(404).send({error: "Invalid credentials"});
};

export const checkForInactivity = (req: Request, res: Response, next: NextFunction) => {
    const creationTime: number | undefined = req.session.creationTime;
    const now: number = new Date().getTime();
    const oneMinute: number = 1000 * 60;
    if (creationTime && now - creationTime > oneMinute) {
        res.redirect('/login/logout/?sessionExpired=true');
    }
}