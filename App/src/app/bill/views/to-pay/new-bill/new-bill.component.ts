import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Supplier } from '../../../entities/supplier.entity';
import { ToPayService } from '../../../services/to-pay.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss'],
})
export class NewBillComponent implements OnInit {
  public formGroup!: FormGroup;
  public suppliers!: Supplier[];
  public hasFormErrors!: boolean;

  constructor(
    private location: Location,
    private toPayService: ToPayService,
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
    this.toPayService.initializeForm();
    this.formGroup = this.toPayService.basicForm;
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
    this.toPayService.reset();
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

      const toPay = this.formGroup.controls;

      if (this.formGroup.invalid) {
        Object.keys(toPay).forEach((controlName) =>
          toPay[controlName].markAsTouched()
        );
      }

      this.hasFormErrors = true;
      return;
    }
    this.toPayService.submit().subscribe((res) => {
      if (!res) {
      }
      this.back();
    });
  }
}
