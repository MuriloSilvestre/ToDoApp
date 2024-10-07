import { Client } from '../../bill/entities/client.entity';
import { PaymentType } from './payment-type.entity';
import { SaleProduct } from './sale-product.entity';

export class Sale {
  public id?: number;

  public tipo_pagamento!: PaymentType;

  public venda_produto!: SaleProduct[];

  public cliente!: Client;
}
