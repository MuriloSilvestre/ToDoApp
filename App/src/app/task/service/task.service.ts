import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, take, tap, map, catchError, throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../entities/task.entity';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../shared/Services/error.service';
import { SucessService } from '../../shared/Services/sucess.service';

const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public basicForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);
  private token: any;

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private sucessService: SucessService,
    private router: Router
  ) {
    this.initializeForm();
  }

  public list(apiRoute: string) {
    return this.http.get<Task[]>(`${AUTH_API}${apiRoute}`).pipe(
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  public getOneById(id: number): Observable<Task> {
    if (id) {
      return this.http.get<Task>(`${AUTH_API}api/task/${id}`).pipe(
        take(1),
        map((resData) => resData),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(
            () =>
              new Error(
                'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
              )
          );
        })
      );
    } else {
      return null as any;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: Task) {
    return this.http
      .post<Task>(`${AUTH_API}api/task`, registro)
      .pipe(
        take(1),
        tap(),
        map((resData) => {
          this.sucessService.showSucess(
            'Sua tarefa foi cadastrada e está pronta para ser gerenciada.'
          );
          return resData;
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(
            () =>
              new Error(
                'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
              )
          );
        })
      )
      .subscribe({
        next: (resData) => {
          this.router.navigate(['/task']);
          this.initializeForm();
        },
        error: (error: Error) => {
          this.initializeForm();
          this.error.set(error.message);
          this.isFetching.set(false);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}api/task/${id}`).pipe(
      take(1),
      tap(),
      map((resData) => {
        this.sucessService.showSucess(
          'Sua tarefa foi Removida e não está mais disponível para gerenciamento.'
        );
        return resData;
      }),
      catchError((error) => {
        console.log(error);
        this.errorService.showError(
          'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
        );
        return throwError(
          () =>
            new Error(
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
            )
        );
      })
    );
  }

  private update(registro: Task, id: number) {
    registro.id = id;
    return this.http
      .put(`${AUTH_API}api/task/${id}`, registro)
      .pipe(
        take(1),
        tap(),
        map((resData) => {
          this.sucessService.showSucess(
            'Sua tarefa foi Editada e ainda está pronta para ser gerenciada.'
          );
          return resData;
        }),
        catchError((error) => {
          console.log(error);
          this.errorService.showError(
            'Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
          );
          return throwError(
            () =>
              new Error(
                'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.'
              )
          );
        })
      )
      .subscribe({
        next: (resData) => {
          this.router.navigate(['/task']);
          this.initializeForm();
        },
        error: (error: Error) => {
          this.error.set(error.message);
          this.isFetching.set(false);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  //Método Public para as operações de Post e PUT
  private save(registro: Task, id?: number) {
    if (id) {
      return this.update(registro, id);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      Title: ['', Validators.compose([Validators.required])],
      Description: ['', Validators.compose([Validators.required])],
      IsCompleted: [false, Validators.compose([Validators.required])],
      DueDate: [new Date(), Validators.compose([Validators.required])],
    });
  }

  public fillForm(Task: Task) {
    const dueDate = new Date(Task.dueDate).toISOString().split('T')[0];
    this.basicForm.patchValue({
      Id: Task.id,
      Title: Task.title,
      Description: Task.description,
      IsCompleted: Task.isCompleted,
      DueDate: dueDate,
      UserId: Task.userId,
      CreateAt: Task.createAt,
      UpdateAt: Task.updateAt,
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
  public submit(id?: number) {
    return this.save(this.basicForm.value, id);
  }

  public handleError(error: HttpErrorResponse) {
    return error;
  }
}
