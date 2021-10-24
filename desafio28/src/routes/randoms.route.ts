import express, {IRouter} from 'express';
import {randoms} from '../controllers/randoms.controller';

const router: IRouter = express.Router();

router.get('/', randoms);

export default router;
