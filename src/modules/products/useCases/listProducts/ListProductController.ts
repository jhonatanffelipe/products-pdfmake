import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductUseCase } from "./ListProductUseCase";

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductUseCase = container.resolve(ListProductUseCase);

    const products = await listProductUseCase.execute();

    return response.status(200).json(products);
  }
}

export { ListProductsController };
