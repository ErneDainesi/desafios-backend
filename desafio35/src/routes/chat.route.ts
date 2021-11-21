import express, {IRouter} from 'express';
import {chatPage} from '../controllers/chat.controller';

const router: IRouter = express.Router();

router.get('/', chatPage);

export default router;

