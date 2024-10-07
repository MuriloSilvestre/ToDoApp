import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../entities/supplier.entity';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss'],
})
export class ListSupplierComponent implements OnInit {
  public suppliers!: Supplier[];

  constructor(
    public router: Router,
    public readonly supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.supplierService.list().subscribe((res) => {
      if (res) {
        this.suppliers = res;
      }
    });
  }

  public remove(id: number) {
    this.supplierService.remove(id).subscribe((res) => {
      if (res) {
        this.loadElements();
      }
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/fornecedor/novo', id]);
  }
}
