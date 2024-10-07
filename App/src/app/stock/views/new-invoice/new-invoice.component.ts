import { Component, OnInit } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  valorVarejo: number;
  valorAtacado: number;
  quantidade: number;
  quantidadeAtacado: number;
  validade: string;
  ultimaCompra: string;
}

const ELEMENT_DATA: Produto[] = [
  {
    id: 1,
    nome: 'Hydrogen',
    valor: 1.0079,
    valorVarejo: 1.0079,
    valorAtacado: 1.0079,
    quantidade: 3,
    quantidadeAtacado: 3,
    validade: '2022-12-17',
    ultimaCompra: '2022-12-17',
  },
  {
    id: 2,
    nome: 'Helium',
    valor: 4.0026,
    valorVarejo: 4.0026,
    valorAtacado: 4.0026,
    quantidade: 3,
    quantidadeAtacado: 3,
    validade: '2022-12-18',
    ultimaCompra: '2022-12-18',
  },
  {
    id: 3,
    nome: 'Lithium',
    valor: 6.941,
    valorVarejo: 6.941,
    valorAtacado: 6.941,
    quantidade: 3,
    quantidadeAtacado: 3,
    validade: '2022-12-19',
    ultimaCompra: '2022-12-19',
  },
  {
    id: 4,
    nome: 'Beryllium',
    valor: 9.0122,
    valorVarejo: 9.0122,
    valorAtacado: 9.0122,
    quantidade: 3,
    quantidadeAtacado: 3,
    validade: '2022-12-20',
    ultimaCompra: '2022-12-20',
  },
];
@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements OnInit {
  public Produtos: Produto[] = ELEMENT_DATA;
  public total: number = 0;
  public srcResult!: any;
  constructor() {}

  ngOnInit(): void {}

  removerProdutos(i: number) {
    this.Produtos.splice(i, 1);
    this.somaTotal();
  }

  adicionarProdutos() {
    this.Produtos = ELEMENT_DATA;
    this.somaTotal();
  }

  adicionarQuantidade(i: number, quantidade: number) {
    this.Produtos[i].quantidade = quantidade;
    this.Produtos[i].valor = this.Produtos[i].valorVarejo * quantidade;
    this.somaTotal();
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  somaTotal() {
    this.total = 0;
    this.Produtos.forEach((res) => {
      this.total += res.valor;
    });
  }
}
