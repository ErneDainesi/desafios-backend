import express, {application, IRouter} from 'express';
import passport from 'passport';
import {
    loginMainPage,
    login,
    failedLogin,
    welcome,
    logout,
    signup,
    signupPage,
    failSignup
} from '../controllers/login.controller';

const router: IRouter = express.Router();

router.get('/', loginMainPage);
router.post('/', passport.authenticate('login', {failureRedirect: '/login/failLogin'}), login);
router.get('/signup', signupPage)
router.post('/signup', passport.authenticate('signup', {failureRedirect: '/login/failSignup'}), signup);
router.get('/failLogin', failedLogin);
router.get('/failSignup', failSignup);
router.get('/welcome', welcome);
router.get('/logout', logout);

export default router;
