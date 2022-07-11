import { Router } from "express";

import { CreateProductController } from "../../../../modules/products/useCases/createProduct/CreateProductController";
import { ListProductsController } from "../../../../modules/products/useCases/listProducts/ListProductController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productsRoutes.post("/", createProductController.handle);

productsRoutes.get("/", listProductsController.handle);

export { productsRoutes };
