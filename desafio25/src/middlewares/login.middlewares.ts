import { NextFunction, Request, Response } from "express";

export const checkForInactivity = (req: Request, res: Response, next: NextFunction) => {
    const creationTime: number | undefined = req.session.creationTime;
    const now: number = new Date().getTime();
    const oneMinute: number = 1000 * 60;
    if (creationTime && now - creationTime > oneMinute) {
        res.redirect('/login/logout/?sessionExpired=true');
    }
};
