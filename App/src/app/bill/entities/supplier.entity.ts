import { Product } from '../../stock/entities/product.entity';
import { Salesman } from './salesman.entity';
import { ToPay } from './to-pay.entity';

export class Supplier {
  public id?: number;

  public cnpj!: string;

  public razao_social!: string;

  public nome_fantasia!: string;

  public telefone!: string;

  public vendedor!: Salesman;

  public produto?: Product[];

  public a_pagar?: ToPay;
}
