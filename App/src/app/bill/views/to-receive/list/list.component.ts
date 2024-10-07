import { Component, OnInit } from '@angular/core';

export interface Receber {
  id: number;
  fornecedor: string;
  valorAtual: number;
  valorCredito: number;
  vencimento: string;
  vencido: boolean;
}

const ELEMENT_DATA: Receber[] = [
  {
    id: 1,
    fornecedor: 'Hydrogen',
    valorAtual: 1.0079,
    valorCredito: 1.0079,
    vencimento: '2022-12-17',
    vencido: false,
  },
  {
    id: 2,
    fornecedor: 'Helium',
    valorAtual: 4.0026,
    valorCredito: 4.0026,
    vencimento: '2022-12-18',
    vencido: false,
  },
  {
    id: 3,
    fornecedor: 'Lithium',
    valorAtual: 6.941,
    valorCredito: 6.941,
    vencimento: '2022-12-19',
    vencido: false,
  },
  {
    id: 4,
    fornecedor: 'Beryllium',
    valorAtual: 9.0122,
    valorCredito: 9.0122,
    vencimento: '2022-12-20',
    vencido: false,
  },
  {
    id: 5,
    fornecedor: 'Boron',
    valorAtual: 10.811,
    valorCredito: 10.811,
    vencimento: '2022-12-21',
    vencido: false,
  },
  {
    id: 6,
    fornecedor: 'Carbon',
    valorAtual: 12.0107,
    valorCredito: 12.0107,
    vencimento: '2022-12-22',
    vencido: false,
  },
  {
    id: 7,
    fornecedor: 'Nitrogen',
    valorAtual: 14.0067,
    valorCredito: 14.0067,
    vencimento: '2022-12-23',
    vencido: false,
  },
  {
    id: 8,
    fornecedor: 'Oxygen',
    valorAtual: 15.9994,
    valorCredito: 15.9994,
    vencimento: '2022-12-24',
    vencido: false,
  },
  {
    id: 9,
    fornecedor: 'Fluorine',
    valorAtual: 18.9984,
    valorCredito: 18.9984,
    vencimento: '2022-12-25',
    vencido: false,
  },
  {
    id: 10,
    fornecedor: 'Neon',
    valorAtual: 20.1797,
    valorCredito: 20.1797,
    vencimento: '2022-12-26',
    vencido: false,
  },
  {
    id: 11,
    fornecedor: 'Neon',
    valorAtual: 20.1797,
    valorCredito: 20.1797,
    vencimento: '2022-12-27',
    vencido: false,
  },
  {
    id: 12,
    fornecedor: 'Neon',
    valorAtual: 20.1797,
    valorCredito: 20.1797,
    vencimento: '2022-12-28',
    vencido: false,
  },
  {
    id: 13,
    fornecedor: 'Neon',
    valorAtual: 20.1797,
    valorCredito: 20.1797,
    vencimento: '2022-12-29',
    vencido: false,
  },
  {
    id: 14,
    fornecedor: 'Neon',
    valorAtual: 20.1797,
    valorCredito: 20.1797,
    vencimento: '2022-12-31',
    vencido: false,
  },
];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListToReceiveComponent implements OnInit {
  public Recebidas: Receber[] = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
