import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, price, quantity } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    await createProductUseCase.execute({ description, price, quantity });

    return response.status(201).send();
  }
}

export { CreateProductController };
