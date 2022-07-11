import { getRepository, Repository } from "typeorm";

import {
  ICreateProductDTO,
  IProductsRepository,
} from "../../../repositories/IProductsRepository";
import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    description,
    price,
    amount,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      description,
      price,
      amount,
    });

    await this.repository.save(product);
    return product;
  }

  async list(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  async findByDescription(description: string): Promise<Product> {
    const product = await this.repository.findOne({ description });
    return product;
  }
}

export { ProductsRepository };
