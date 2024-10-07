import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent implements OnInit {
  public formGroup!: FormGroup;
  public hasFormErrors!: boolean;

  constructor(
    private location: Location,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.hasFormErrors = false;
    this.loadElements();
  }

  private loadElements() {
    this.clientService.initializeForm();
    this.formGroup = this.clientService.basicForm;
  }

  public clean(): void {
    this.clientService.reset();
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

      const client = this.formGroup.controls;

      if (this.formGroup.invalid) {
        Object.keys(client).forEach((controlName) =>
          client[controlName].markAsTouched()
        );
      }

      this.hasFormErrors = true;
      return;
    }
    this.clientService.submit().subscribe((res) => {
      if (!res) {
      }
      this.back();
    });
  }
}
