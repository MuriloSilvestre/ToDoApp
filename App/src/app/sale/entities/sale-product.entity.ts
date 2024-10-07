import { Product } from '../../stock/entities/product.entity';
import { Sale } from './sale.entity';

export class SaleProduct {
  public id?: number;

  public venda!: Sale;

  public produto!: Product;

  public valor!: number;

  public quantidade!: number;
}
