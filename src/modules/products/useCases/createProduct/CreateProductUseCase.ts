import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
  description: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ description, price, quantity }: IRequest) {
    const productAlreadyExists =
      await this.productsRepository.findByDescription(description);

    if (productAlreadyExists) {
      throw new AppError("Product already exists!", 400);
    }

    await this.productsRepository.create({ description, price, quantity });
  }
}

export { CreateProductUseCase };
