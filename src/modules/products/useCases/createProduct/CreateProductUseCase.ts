import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
  description: string;
  price: number;
  amount: number;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ description, price, amount }: IRequest): Promise<Product> {
    const productAlreadyExists =
      await this.productsRepository.findByDescription(description);

    if (productAlreadyExists) {
      throw new AppError("Product already exists!", 400);
    }

    const product = await this.productsRepository.create({
      description,
      price,
      amount,
    });

    return product;
  }
}

export { CreateProductUseCase };
