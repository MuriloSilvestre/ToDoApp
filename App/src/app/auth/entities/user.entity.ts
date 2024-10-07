import { Company } from './company.entity';

export class User {
  public id?: number;

  public nome_usuario!: string;

  public senha!: string;

  public nome!: string;

  public cpf!: string;

  public telefone!: string;

  public tipo_usuario!: string;

  public empresa!: Company;
}
