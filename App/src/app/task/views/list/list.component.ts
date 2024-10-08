import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../entities/task.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public tasks!: Task[];

  constructor(
    private router: Router,
    private readonly taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.taskService.list().subscribe((res) => {
      if (!res) {
      }
      this.tasks = res;
    });
  }

  public remove(id: number) {
    this.taskService.remove(id).subscribe((res) => {
      this.loadElements();
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/task/new-task', id]);
  }
}
