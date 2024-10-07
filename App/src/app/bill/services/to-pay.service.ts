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
import { ToPay } from '../entities/to-pay.entity';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ToPayService {
  public basicForm!: FormGroup;

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<ToPay[]>(`${AUTH_API}/to-pay`);
  }

  public getOneById(id: number) {
    if (id != null && id > 0) {
      return this.http.get<ToPay>(`${AUTH_API}/to-pay/${id}`).pipe(take(1));
    } else {
      return null;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: ToPay) {
    return this.http.post<ToPay>(`${AUTH_API}/to-pay`, registro).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro inserido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}/to-pay/${id}`).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro removido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  private update(registro: ToPay) {
    return this.http.put(`${AUTH_API}/to-pay/${registro.id}`, registro).pipe(
      take(1),
      tap()
      // (data) => this.toastr.success('Registro atualizado com sucesso'),
      // (error) => this.toastr.error(error.error.message)
    );
  }

  //Método Public para as operações de Post e PUT
  public save(registro: ToPay) {
    if (registro.id && registro.id > 0) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      id: [0, Validators.compose([])],
      valor: [0, Validators.compose([Validators.required])],
      vencimento: [Date.now(), Validators.compose([Validators.required])],
      tipo_pagamento: this.fb.group({
        descricao: ['', Validators.compose([Validators.required])],
      }),
      fornecedor: [
        this.fb.group({
          id: [0, Validators.compose([])],
          cnpj: ['', Validators.compose([])],
          razao_social: ['', Validators.compose([])],
          nome_fantasia: ['', Validators.compose([])],
          telefone: ['', Validators.compose([])],
        }),
      ],
    });
  }

  public fillForm(ToPay: ToPay) {
    this.basicForm.patchValue({
      id: ToPay.id,
      valor: ToPay.valor,
      vencimento: ToPay.vencimento,
      tipo_pagamento: {
        descricao: ToPay.tipo_pagamento.descricao,
      },
      fornecedor: { ...ToPay.fornecedor },
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
