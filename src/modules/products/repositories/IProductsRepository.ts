import { Product } from "../infra/typeorm/entities/Product";

interface ICreateProductDTO {
  description: string;
  price: number;
  amount: number;
}

interface IProductsRepository {
  create({ description, price, amount }: ICreateProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  findByDescription(description: string): Promise<Product>;
}

export { IProductsRepository, ICreateProductDTO };
