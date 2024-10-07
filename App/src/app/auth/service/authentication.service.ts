import { User } from './../entities/user.entity';
import { TokenstorageService } from './tokenstorage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap, map } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { environment } from '../../../environments/environment';

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

  submit(nome_usuario: string, senha: string) {
    return this.login(nome_usuario, senha);
  }

  inicializaForm() {
    this.formularioBasico = this.fb.group({
      nome_usuario: [, Validators.compose([Validators.required])],
      senha: [, Validators.compose([Validators.required])],
      confirmarSenha: [, Validators.compose([Validators.required])],
    });
  }

  preencheFormulario(user: User) {
    this.formularioBasico.patchValue({
      nome_usuario: user.nome_usuario,
      senha: user.senha,
    });
  }

  login(nome_usuario: string, senha: string) {
    return this.http
      .post<User>(`${AUTH_API}/user/login`, { nome_usuario, senha })
      .pipe(
        map((response) => {
          this.token.saveUser(response);
        })
      );
  }

  forgotpassword(senha: string, confirmarSenha: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgotpassword',
      {
        senha,
      },
      httpOptions
    );
  }
}
