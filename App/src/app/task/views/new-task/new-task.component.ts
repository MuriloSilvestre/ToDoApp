import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Task } from '../../../task/entities/task.entity';

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  public formGroup!: FormGroup;
  public tasks!: Task[];
  public hasFormErrors!: boolean;

  constructor(private location: Location, private taskService: TaskService) {}

  ngOnInit(): void {
    this.hasFormErrors = false;
    this.loadElements();
  }

  private loadElements() {
    this.taskService.list().subscribe((res) => {
      if (res) {
        this.tasks = res;
      }
    });
    this.formGroup = this.taskService.basicForm;
  }

  public findtask(task: Task) {
    this.formGroup.patchValue({
      fornecedor: [
        {
          ...task,
        },
      ],
    });
  }

  public clean(): void {
    this.taskService.reset();
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
    this.taskService.submit().subscribe((res) => {
      if (!res) {
      }
      this.back();
    });
  }
}
