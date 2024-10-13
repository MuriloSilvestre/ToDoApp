import { User } from '../entities/user.entity';
import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ErrorService } from '../../shared/Services/error.service';
import { SucessService } from '../../shared/Services/sucess.service';
import { ActivatedRoute, Router } from '@angular/router';

const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public basicForm!: FormGroup;
  public passwordForm!: FormGroup;
  public error = signal('');
  public isFetching = signal(false);

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private sucessService: SucessService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<User[]>(`${AUTH_API}api/user`).pipe(
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

  public getOneById(id: number): Observable<User> {
    if (id) {
      return this.http.get<User>(`${AUTH_API}api/user/${id}`).pipe(
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

  public getOneByEmail(email: string): Observable<User> {
    if (email) {
      return this.http.get<User>(`${AUTH_API}api/User/email=${email}`).pipe(
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
  private create(registro: User) {
    return this.http
      .post<User>(`${AUTH_API}api/user`, registro)
      .pipe(
        take(1),
        tap(),
        map((resData) => {
          this.sucessService.showSucess(
            'Novo usuário foi cadastrado e pronto para ser utilizado.'
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
          this.router.navigate(['/profile']);
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
    return this.http.delete(`${AUTH_API}api/user/${id}`).pipe(
      take(1),
      tap(),
      map((resData) => {
        this.sucessService.showSucess(
          'o usuário foi Removida e não está mais disponível para utilização.'
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

  private update(registro: User, id: number) {
    registro.id = id;
    return this.http
      .put(`${AUTH_API}api/user/${id}`, registro)
      .pipe(
        take(1),
        tap(),
        map((resData) => {
          this.sucessService.showSucess(
            'O Usuário foi Editada e ainda está pronta para ser utilizado.'
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
          this.router.navigate(['/profile']);
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
  private save(registro: User, id?: number) {
    if (id) {
      return this.update(registro, id);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
    });
  }

  public initializeFormPassword() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(User: User) {
    this.basicForm.patchValue({
      Id: User.id,
      name: User.name,
      email: User.email,
      password: User.password,
      createAt: User.createAt,
      updateAt: User.updateAt,
    });
  }

  public fillFormPassword(User: User, newPassword: string) {
    this.basicForm.patchValue({
      Id: User.id,
      name: User.name,
      email: User.email,
      password: User.password,
      newPassword: newPassword,
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
