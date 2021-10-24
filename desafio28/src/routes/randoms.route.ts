import express, {IRouter} from 'express';
import {generateRandomNumbers} from '../controllers/randoms.controller';

const router: IRouter = express.Router();

router.get('/', generateRandomNumbers);

export default router;
