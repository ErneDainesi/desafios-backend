import express, {IRouter} from 'express';
import passport from 'passport';
import {
	failedLogin,
	welcome,
	logout,
} from '../controllers/login.controller';

const router: IRouter = express.Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook',
	{
		successRedirect: '/welcome',
		failureRedirect: '/failedLogin'
	}
));
router.get('/failedLogin', failedLogin);
router.get('/welcome', welcome);
router.get('/logout', logout);

export default router;

