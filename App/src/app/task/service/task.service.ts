import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap, map } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Task } from '../entities/task.entity';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public basicForm!: FormGroup;

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<Task[]>(`${AUTH_API}/api/task`);
  }

  public getOneById(id: number) {
    if (id != null && id > 0) {
      return this.http.get<Task>(`${AUTH_API}/api/task/${id}`).pipe(take(1));
    } else {
      return null;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: Task) {
    return this.http.post<Task>(`${AUTH_API}/api/task`, registro).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro inserido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}/api/task/${id}`).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro removido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  private update(registro: Task) {
    return this.http.put(`${AUTH_API}/api/task/${registro.id}`, registro).pipe(
      take(1),
      tap()
      // (data) => this.toastr.success('Registro atualizado com sucesso'),
      // (error) => this.toastr.error(error.error.message)
    );
  }

  //Método Public para as operações de Post e PUT
  private save(registro: Task) {
    if (registro.id && registro.id > 0) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      Id: [0, Validators.compose([])],
      Title: ['', Validators.compose([Validators.required])],
      Description: ['', Validators.compose([Validators.required])],
      IsCompleted: [false, Validators.compose([Validators.required])],
      DueDate: [new Date(), Validators.compose([Validators.required])],
      UserId: [1, Validators.compose([Validators.required])],
      CreateAt: [new Date(), Validators.compose([])],
      UpdateAt: [new Date(), Validators.compose([])],
    });
  }

  public fillForm(Task: Task) {
    this.basicForm.patchValue({
      Id: Task.id,
      Title: Task.Title,
      Description: Task.Description,
      IsCompleted: Task.IsCompleted,
      DueDate: Task.DueDate,
      UserId: Task.UserId,
      CreateAt: Task.CreateAt,
      UpdateAt: Task.UpdateAt,
    });
  }

  get getBasicForm() {
    return this.basicForm.controls;
  }

  //Limpeza do formulário
  public reset() {
    this.basicForm.reset();
  }

  // Serviços
  public submit() {
    return this.save(this.basicForm.value);
  }

  public handleError(error: HttpErrorResponse) {
    return error;
  }
}
