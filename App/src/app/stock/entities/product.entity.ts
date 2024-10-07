import { Supplier } from '../../bill/entities/supplier.entity';
import { SaleProduct } from '../../sale/entities/sale-product.entity';
import { COFINS } from './cofins.entity';
import { ICMS } from './icms.entity';
import { IPI } from './ipi.entity';
import { PIS } from './pis.entity';

export class Product {
  public id?: number;

  public decricao!: string;

  public ncm?: number;

  public cfop?: number;

  public ean?: number;

  public ean_tributavel?: number;

  public cest?: number;

  public unidade_comercial!: number;

  public quantidade!: number;

  public quantidade_atacado?: number;

  public valor_pago!: number;

  public valor_varejo!: number;

  public valor_atacado?: number;

  public validade!: Date;

  public ultima_compra?: Date;

  public fornecedor!: Supplier[];

  public icms!: ICMS;

  public pis!: PIS;

  public ipi!: IPI;

  public cofins!: COFINS;

  public venda_produto?: SaleProduct[];
}
