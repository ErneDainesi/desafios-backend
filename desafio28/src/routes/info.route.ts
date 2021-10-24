import express, {IRouter} from 'express';
import {getInfo} from '../controllers/info.controller';

const router: IRouter = express.Router();

router.get('/', getInfo);

export default router;

