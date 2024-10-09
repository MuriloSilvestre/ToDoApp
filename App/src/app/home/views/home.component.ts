import { Task } from './../../task/entities/task.entity';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task/service/task.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  totalTasks!: number;
  completedTasks!: number;
  pendingTasks!: number;
  tasks!: Observable<Task[]>;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {}

  get completionRate() {
    this.tasks = this.taskService.list();
    return (this.completedTasks / this.totalTasks) * 100;
  }
}
