import { Product } from "../infra/typeorm/entities/Product";

interface ICreateProductDTO {
  description: string;
  price: number;
  quantity: number;
}

interface IProductsRepository {
  create({ description, price, quantity }: ICreateProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  findByDescription(description: string): Promise<Product>;
}

export { IProductsRepository, ICreateProductDTO };
