import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Task } from '../../../task/entities/task.entity';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class NewTaskComponent implements OnInit {
  public taskId!: number; // Variável para armazenar o ID da tarefa
  IsCompleted: string = '';

  constructor(
    private location: Location,
    public taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturando o parâmetro 'id' da rota
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id; // Convertendo o ID para número
        this.loadTask(this.taskId); // Carregar a tarefa com o ID
      } else {
        this.taskService.initializeForm();
      }
    });
  }

  private loadTask(id: number) {
    this.taskService.getOneById(id).subscribe({
      next: (resData) => {
        this.taskService.fillForm(resData);
        this.IsCompleted = resData.isCompleted == true ? 'true' : 'false';
      },
      error: (error: Error) => {
        this.clean();
        this.taskService.error.set(error.message);
        this.taskService.isFetching.set(false);
      },
      complete: () => {
        this.taskService.isFetching.set(false);
      },
    });
  }

  public clean(): void {
    this.taskService.reset();
  }

  public ngOnSubmit() {
    this.taskService.basicForm.patchValue({
      IsCompleted: this.IsCompleted == 'true' ? true : false,
      ...this.taskService.basicForm,
    });
    const controls = this.taskService.basicForm.controls;
    if (this.taskService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.taskService.submit(this.taskId);
  }

  onCancel() {
    // Limpa o formulário
    this.taskService.basicForm.reset();

    // Redireciona para a rota de tarefas
    this.router.navigate(['/task']);
  }
}
