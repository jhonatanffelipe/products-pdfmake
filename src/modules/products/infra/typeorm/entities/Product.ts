import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("products")
class Product {
  @PrimaryColumn()
  id?: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  quantity: number;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Product };
