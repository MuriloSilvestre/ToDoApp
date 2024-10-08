import { Task } from './../../task/entities/task.entity';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task/service/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
    console.log(this.tasks);
    return (this.completedTasks / this.totalTasks) * 100;
  }
}
