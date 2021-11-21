import {Request, Response} from "express";
import logger from "../logger/winston";
import {transporter} from "../mailer";

export const failedLogin = (req: Request, res: Response) => {
	logger.error("Failed Login");
	res.send("<h1>Failed Login</h1>");
};

export const welcome = (req: Request, res: Response) => {
	const {user} = req.query;
	const mailOptions = {
		from: 'Nodejs server',
		to: 'weston.braun16@ethereal.email',
		subject: 'Login',
		htmt: `<h1>Logged in as ${user}</h1>`
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			logger.error(err);
			res.status(500).send('<h1>Failed logout</h1>');
		} else {
			logger.info(info);
			res.render('pages/welcome', {user});
		}
	})
};

export const logout = (req: Request, res: Response) => {
	const expiredSession: boolean = req.query.sessionExpired === "true";
	const mailOptions = {
		from: 'Nodejs server',
		to: 'weston.braun16@ethereal.email',
		subject: 'Logout',
		html: '<h1>Logged out from server</h1>'
	};
	req.session.destroy(err => {
		if (!err && !expiredSession) {
			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					logger.error(err);
					res.status(500).send('<h1>Failed logout</h1>');
				} else {
					logger.info(info);
					res.clearCookie('userSession').render('pages/logout', {sessionExpiredMessage: false});
				}
			})
		} else if (!err && expiredSession) {
			const sessionExpiredMessage = "Session expired";
			res.clearCookie('userSession').render('pages/logout', {sessionExpiredMessage});
		} else {
			res.send({status: 'Logout Error', body: err});
		}
	})
};
