import express, {IRouter} from 'express';
import {validateCredentials} from '../middlewares/validate_login';
import {loginMainPage, login, welcome, logout} from '../controllers/login.controller';

const router: IRouter = express.Router();

router.get('/', loginMainPage);
router.post('/', validateCredentials, login);
router.get('/welcome', welcome);
router.get('/logout', logout);

export default router;
