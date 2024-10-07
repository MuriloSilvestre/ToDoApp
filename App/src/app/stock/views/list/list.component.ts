import { Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public Produtos!: Product[];

  constructor(
    private router: Router,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.productService.list().subscribe((res) => {
      if (!res) {
      }
      this.Produtos = res;
    });
  }

  public remove(id: number) {
    this.productService.remove(id).subscribe((res) => {
      if (res) {
        this.loadElements();
      }
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/estoque/novo-produto', id]);
  }
}
