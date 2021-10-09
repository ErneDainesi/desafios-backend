import express, {IRouter} from 'express';
import {loginMainPage, login, welcome, logout} from '../controllers/login.controller';

const router: IRouter = express.Router();

router.get('/', loginMainPage);
router.post('/', login);
router.get('/welcome', welcome);
router.get('/logout', logout);

export default router;
