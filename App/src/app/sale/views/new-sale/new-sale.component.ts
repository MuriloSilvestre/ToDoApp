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

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  public Produtos!: Produto[];
  public total: number = 0;
  constructor() {}

  ngOnInit(): void {}

  removerProdutos(i: number) {
    this.Produtos.splice(i, 1);
    this.somaTotal();
  }

  adicionarProdutos() {
    this.Produtos = [];
    this.somaTotal();
  }

  adicionarQuantidade(i: number, quantidade: number) {
    this.Produtos[i].quantidade = quantidade;
    this.Produtos[i].valor = this.Produtos[i].valorVarejo * quantidade;
    this.somaTotal();
  }

  somaTotal() {
    this.total = 0;
    this.Produtos.forEach((res) => {
      this.total += res.valor;
    });
  }
}
