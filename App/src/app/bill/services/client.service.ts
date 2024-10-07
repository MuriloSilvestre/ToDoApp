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
import { environment } from '../../../environments/environment';
import { Client } from '../entities/client.entity';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public basicForm!: FormGroup;

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<Client[]>(`${AUTH_API}/client`);
  }

  public getOneById(id: number) {
    if (id != null && id > 0) {
      return this.http.get<Client>(`${AUTH_API}/client/${id}`).pipe(take(1));
    } else {
      return null;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: Client) {
    return this.http.post<Client>(`${AUTH_API}/client`, registro).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro inserido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}/client/${id}`).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro removido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  private update(registro: Client) {
    return this.http.put(`${AUTH_API}/client/${registro.id}`, registro).pipe(
      take(1),
      tap()
      // (data) => this.toastr.success('Registro atualizado com sucesso'),
      // (error) => this.toastr.error(error.error.message)
    );
  }

  //Método Public para as operações de Post e PUT
  public save(registro: Client) {
    if (registro.id && registro.id > 0) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      id: [0, Validators.compose([])],
      cpf: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      tem_credito: [false, Validators.compose([Validators.required])],
      credito: this.fb.group({
        valor_credito: [0, Validators.compose([Validators.required])],
        periodo_pagamento: [0, Validators.compose([Validators.required])],
      }),
      cep: [0, Validators.compose([Validators.required])],
      rua: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      complemento: ['', Validators.compose([])],
      bairro: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
    });
  }

  public fillForm(Client: Client) {
    this.basicForm.patchValue({
      id: Client.id,
      cpf: Client.cpf,
      nome: Client.nome,
      telefone: Client.telefone,
      tem_credito: Client.tem_credito,
      credito: {
        id: Client.credito?.id,
        valor_credito: Client.credito?.valor_credito,
        periodo_pagamento: Client.credito?.periodo_pagamento,
      },
      cep: Client.cep,
      rua: Client.rua,
      numero: Client.numero,
      complemento: Client.complemento,
      bairro: Client.bairro,
      cidade: Client.cidade,
      estado: Client.estado,
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
