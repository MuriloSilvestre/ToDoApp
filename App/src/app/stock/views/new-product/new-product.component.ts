import { SupplierService } from './../../../bill/services/supplier.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Supplier } from '../../../bill/entities/supplier.entity';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  public formGroup!: FormGroup;
  public suppliers!: Supplier[];
  public hasFormErrors!: boolean;

  constructor(
    private location: Location,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.hasFormErrors = false;
    this.loadElements();
  }

  private loadElements() {
    this.supplierService.list().subscribe((res) => {
      if (res) {
        this.suppliers = res;
      }
    });
    this.productService.initializeForm();
    this.formGroup = this.productService.basicForm;
  }

  public findSupplier(supplier: Supplier) {
    this.formGroup.patchValue({
      fornecedor: [
        {
          ...supplier,
        },
      ],
    });
  }

  public clean(): void {
    this.productService.reset();
  }

  private back(): void {
    this.location.back();
  }

  public ngOnSubmit() {
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      const product = this.formGroup.controls;

      if (this.formGroup.invalid) {
        Object.keys(product).forEach((controlName) =>
          product[controlName].markAsTouched()
        );
      }

      this.hasFormErrors = true;
      return;
    }
    this.productService.submit().subscribe((res) => {
      if (!res) {
      }
      this.back();
    });
  }
}
