import { Sale } from '../../sale/entities/sale.entity';
import { Credit } from './credit.entity';

export class Client {
  public id?: number;

  public cpf!: string;

  public nome!: string;

  public telefone!: string;

  public tem_credito!: boolean;

  public credito?: Credit;

  public cep!: number;

  public rua!: string;

  public numero!: string;

  public complemento?: string;

  public bairro!: string;

  public cidade!: string;

  public estado!: string;

  public vendas!: Sale[];
}
