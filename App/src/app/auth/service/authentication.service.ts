import { User } from './../entities/user.entity';
import { TokenstorageService } from './tokenstorage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, take, tap, map } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public formularioBasico!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private token: TokenstorageService
  ) {
    this.inicializaForm();
  }

  submit(Email: string, Password: string) {
    return this.login(Email, Password);
  }

  inicializaForm() {
    this.formularioBasico = this.fb.group({
      Email: [, Validators.compose([Validators.required])],
      Password: [, Validators.compose([Validators.required])],
      confirmarPassword: [, Validators.compose([Validators.required])],
    });
  }

  preencheFormulario(user: User) {
    this.formularioBasico.patchValue({
      Email: user.Email,
      Password: user.Password,
    });
  }

  login(Email: string, Password: string) {
    return this.http
      .post<User>(`${AUTH_API}/api/login`, { Email, Password })
      .pipe(
        map((response) => {
          this.token.saveUser(response);
        })
      );
  }

  forgotpassword(Password: string, confirmarPassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgotpassword',
      {
        Password,
      },
      httpOptions
    );
  }
}
