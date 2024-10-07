import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss'],
})
export class NewSupplierComponent implements OnInit {
  public formGroup!: FormGroup;
  public hasFormErrors!: boolean;

  constructor(
    private location: Location,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.hasFormErrors = false;
    this.loadElements();
  }

  private loadElements() {
    this.supplierService.initializeForm();
    this.formGroup = this.supplierService.basicForm;
  }

  public clean(): void {
    this.supplierService.reset();
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

      const supplier = this.formGroup.controls;

      if (this.formGroup.invalid) {
        Object.keys(supplier).forEach((controlName) =>
          supplier[controlName].markAsTouched()
        );
      }

      this.hasFormErrors = true;
      return;
    }
    this.supplierService.submit().subscribe((res) => {
      if (!res) {
      }
      this.back();
    });
  }
}
