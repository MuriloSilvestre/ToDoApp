import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../entities/task.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-list-task',
  standalone: true,
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ListTaskComponent implements OnInit {
  public tasks!: Task[];
  public filteredTasks: Task[] = [];
  public paginatedTasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalPages: number = 0;
  public months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  public years: number[] = [];

  public selectedStatus: string = 'all';
  public selectedDueDate!: string | null;
  public selectedMonth: string = 'all';
  public selectedYear: string = 'all';

  constructor(
    private router: Router,
    private readonly taskService: TaskService,
    private Token: TokenstorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadElements();
    this.populateYears();
  }

  private loadElements() {
    let apiRoute = 'api/task';
    let token = this.Token.getUser();
    if (token.userName && token.userName != 'adm@mail.com') {
      this.userService.getOneByEmail(token.userName).subscribe({
        next: (resData) => {
          apiRoute = `api/task/user/${resData.id}`;
          this.taskService.list(apiRoute).subscribe({
            next: (resData) => {
              this.tasks = resData;
              this.filteredTasks = this.tasks;
              this.totalPages = Math.ceil(
                this.tasks.length / this.itemsPerPage
              );
              this.updatePaginatedTasks();
            },
            error: (error: Error) => {
              this.taskService.error.set(error.message);
              this.taskService.isFetching.set(false);
            },
            complete: () => {
              this.taskService.isFetching.set(false);
            },
          });
        },
        error: (error: Error) => {
          this.userService.error.set(error.message);
          this.userService.isFetching.set(false);
        },
        complete: () => {
          this.userService.isFetching.set(false);
        },
      });
    } else {
      this.taskService.list(apiRoute).subscribe({
        next: (resData) => {
          this.tasks = resData;
          this.filteredTasks = this.tasks;
          this.totalPages = Math.ceil(this.tasks.length / this.itemsPerPage);
          this.updatePaginatedTasks();
        },
        error: (error: Error) => {
          this.taskService.error.set(error.message);
          this.taskService.isFetching.set(false);
        },
        complete: () => {
          this.taskService.isFetching.set(false);
        },
      });
    }
  }

  public remove(id: number) {
    this.taskService.remove(id).subscribe({
      next: () => {},
      error: (error: Error) => {
        this.loadElements();
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.loadElements();
        this.resetFilters();
        this.taskService.isFetching.set(false);
      },
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/task/new-task', id]);
  }

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 1; year++) {
      this.years.push(year);
    }
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task: Task) => {
      let matchesStatus = true;
      let matchesDueDate = true;
      let matchesMonth = true;
      let matchesYear = true;

      // Filtrar por status
      if (this.selectedStatus === 'completed') {
        matchesStatus = task.isCompleted;
      } else if (this.selectedStatus === 'pending') {
        matchesStatus =
          !task.isCompleted && !this.isOverdue(task) && !this.isDueSoon(task);
      } else if (this.selectedStatus === 'dueSoon') {
        matchesStatus = this.isDueSoon(task);
      } else if (this.selectedStatus === 'overdue') {
        matchesStatus = this.isOverdue(task);
      }

      // Filtrar por data de vencimento
      if (this.selectedDueDate) {
        const dueDate = new Date(task.dueDate).toISOString().split('T')[0];
        matchesDueDate = dueDate === this.selectedDueDate;
      }

      // Filtrar por mês
      if (this.selectedMonth !== 'all') {
        const taskMonth = new Date(task.dueDate).toLocaleString('default', {
          month: 'long',
        });
        matchesMonth = taskMonth === this.selectedMonth.toLowerCase();
      }

      // Filtrar por ano
      if (this.selectedYear !== 'all') {
        const taskYear = new Date(task.dueDate).getFullYear();
        matchesYear = taskYear.toString() === this.selectedYear;
      }

      return matchesStatus && matchesDueDate && matchesMonth && matchesYear;
    });

    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedTasks();
  }

  resetFilters(): void {
    this.selectedStatus = 'all';
    this.selectedDueDate = null;
    this.selectedMonth = 'all';
    this.selectedYear = 'all';
    this.filteredTasks = this.tasks;
    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    this.updatePaginatedTasks();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTasks();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
    }
  }

  updatePaginatedTasks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  isOverdue(task: Task): boolean {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < currentDate && !task.isCompleted;
  }

  isDueSoon(task: Task): boolean {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    const diffInTime = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 5 && diffInDays > 0 && !task.isCompleted;
  }
}
