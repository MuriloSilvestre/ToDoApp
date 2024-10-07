import { PaymentType } from '../../sale/entities/payment-type.entity';
import { Supplier } from './supplier.entity';

export class ToPay {
  public id?: number;

  public valor!: number;

  public vencimento!: Date;

  public tipo_pagamento!: PaymentType;

  public fornecedor!: Supplier[];
}
