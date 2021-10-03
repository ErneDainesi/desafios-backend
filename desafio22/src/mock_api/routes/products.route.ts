import { Router, IRouter } from "express";
import { showRandomProducts } from "../controllers/products.controller";

const router: IRouter = Router();

router.get('/:amount', showRandomProducts);
router.get('/', showRandomProducts);

export default router;