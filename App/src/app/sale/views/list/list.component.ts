import { Component, OnInit } from '@angular/core';

export interface Venda {
  id: number;
  cliente: string;
  valor: number;
  horario: string;
  tipoPagamento: string;
  quantidade: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public Vendas: Venda[] = [];

  constructor() {}

  ngOnInit(): void {}
}
