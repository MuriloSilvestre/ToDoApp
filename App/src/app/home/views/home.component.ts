import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task/service/task.service';
import { Task } from './../../task/entities/task.entity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { UserService } from '../../user/services/user.service';

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
  overdueTasks!: number; // Nova propriedade para tarefas atrasadas
  tasksByMonth: { [key: string]: { completed: number; pending: number } } = {};
  monthsToShow: string[] = [];

  constructor(
    public taskService: TaskService,
    private Token: TokenstorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let apiRoute = 'api/task';
    let token = this.Token.getUser();
    if (token.userName && token.userName != 'adm@mail.com') {
      this.userService.getOneByEmail(token.userName).subscribe({
        next: (resData) => {
          apiRoute = `api/task/user/${resData.id}`;
          this.taskService.list(apiRoute).subscribe({
            next: (resData) => {
              this.totalTasks = resData.length;

              this.completedTasks = resData.filter(
                (task: Task) => task.isCompleted
              ).length;
              this.pendingTasks = resData.filter(
                (task: Task) => !task.isCompleted
              ).length;

              // Contar tarefas atrasadas
              this.overdueTasks = this.countOverdueTasks(resData);

              // Organiza as tarefas por mês
              this.organizeTasksByMonth(resData);

              // Define os meses a serem exibidos
              this.setMonthsToShow();

              // Inicializa os gráficos após carregar as tarefas
              this.initPieChart();
              this.initBarChart();
              this.initOverduePieChart(); // Inicializa o gráfico de tarefas atrasadas
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
          this.totalTasks = resData.length;

          this.completedTasks = resData.filter(
            (task: Task) => task.isCompleted
          ).length;
          this.pendingTasks = resData.filter(
            (task: Task) => !task.isCompleted
          ).length;

          // Contar tarefas atrasadas
          this.overdueTasks = this.countOverdueTasks(resData);

          // Organiza as tarefas por mês
          this.organizeTasksByMonth(resData);

          // Define os meses a serem exibidos
          this.setMonthsToShow();

          // Inicializa os gráficos após carregar as tarefas
          this.initPieChart();
          this.initBarChart();
          this.initOverduePieChart(); // Inicializa o gráfico de tarefas atrasadas
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

  get completionRate() {
    return this.totalTasks > 0
      ? Math.round((this.completedTasks / this.totalTasks) * 100)
      : 0;
  }

  countOverdueTasks(tasks: Task[]) {
    const today = new Date();
    return tasks.filter(
      (task) => !task.isCompleted && new Date(task.dueDate) < today
    ).length;
  }

  organizeTasksByMonth(tasks: Task[]) {
    this.tasksByMonth = {};
    const currentYear = new Date().getFullYear(); // Obtém o ano atual

    tasks.forEach((task: Task) => {
      const dueDate = new Date(task.dueDate);
      const month = dueDate.toLocaleString('default', { month: 'long' });

      // Verifica se a tarefa é do ano atual
      if (dueDate.getFullYear() === currentYear) {
        if (!this.tasksByMonth[month]) {
          this.tasksByMonth[month] = { completed: 0, pending: 0 };
        }

        if (task.isCompleted) {
          this.tasksByMonth[month].completed += 1;
        } else {
          this.tasksByMonth[month].pending += 1;
        }
      }
    });
  }

  setMonthsToShow() {
    const currentMonth = new Date().getMonth(); // 0-indexed
    const currentYear = new Date().getFullYear();

    if (currentMonth < 6) {
      this.monthsToShow = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
      ];
    } else {
      this.monthsToShow = [
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
    }
  }

  handleHover = (evt: any, item: any, legend: any) => {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color: string, index: number, colors: string[]) => {
        colors[index] =
          index === item.index || color.length === 9 ? color : color + '4D';
      }
    );
    legend.chart.update();
  };

  handleLeave = (evt: any, item: any, legend: any) => {
    legend.chart.data.datasets[0].backgroundColor.forEach(
      (color: string, index: number, colors: string[]) => {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color;
      }
    );
    legend.chart.update();
  };

  initPieChart() {
    Chart.register(...registerables);

    new Chart('taskTotalChart', {
      type: 'pie',
      data: {
        labels: ['Concluídas', 'Pendentes'],
        datasets: [
          {
            label: 'Tarefas',
            data: [this.completedTasks, this.pendingTasks],
            backgroundColor: ['#2ecc71', '#e74c3c'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            onHover: this.handleHover,
            onLeave: this.handleLeave,
          },
        },
      },
    });
  }

  initOverduePieChart() {
    new Chart('overdueTaskChart', {
      type: 'pie',
      data: {
        labels: ['Atrasadas', 'Não Atrasadas'],
        datasets: [
          {
            label: 'Tarefas Atrasadas',
            data: [this.overdueTasks, this.totalTasks - this.overdueTasks],
            backgroundColor: ['#e74c3c', '#3498db'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            onHover: this.handleHover,
            onLeave: this.handleLeave,
          },
        },
      },
    });
  }

  initBarChart() {
    const completedData = this.monthsToShow.map(
      (month) => this.tasksByMonth[month.toLowerCase()]?.completed || 0
    );
    const pendingData = this.monthsToShow.map(
      (month) => this.tasksByMonth[month.toLowerCase()]?.pending || 0
    );

    new Chart('taskMonthlyChart', {
      type: 'bar',
      data: {
        labels: this.monthsToShow,
        datasets: [
          {
            label: 'Concluídas',
            data: completedData,
            backgroundColor: '#2ecc71',
          },
          {
            label: 'Pendentes',
            data: pendingData,
            backgroundColor: '#e74c3c',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tarefas por Mês',
          },
        },
      },
    });
  }
}
