import { Request, Response } from "express";
import { User } from "../models/User";

export const loginMainPage = (req: Request, res: Response) => {
    res.render('pages/login');
};

export const login = (req: Request, res: Response) => {
    const user: User = {...req.body};
    req.session.user = user;
    req.session.creationTime = new Date().getTime();
    res.cookie('userSession', 'userLoggedIn', {maxAge: 60000}).redirect(`/login/welcome/?user=${user.username}`);
};

export const welcome = (req: Request, res: Response) => {
    const {user} = req.query;
    res.render('pages/welcome', {user});
};

export const logout = (req: Request, res: Response) => {
    const expiredSession: boolean = req.query.sessionExpired === "true";
    req.session.destroy(err => {
        if (!err && !expiredSession) {
            res.clearCookie('userSession').render('pages/logout', {sessionExpiredMessage: false});
        } else if (!err && expiredSession ) {
            const sessionExpiredMessage = "Session expired";
            res.clearCookie('userSession').render('pages/logout', {sessionExpiredMessage});
        } else {
            res.send({status: 'Logout Error', body: err});
        }
    })
};
