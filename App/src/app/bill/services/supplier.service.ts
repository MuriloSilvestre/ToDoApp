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
import { Supplier } from '../entities/supplier.entity';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  public basicForm!: FormGroup;

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<Supplier[]>(`${AUTH_API}/supplier`);
  }

  public getOneById(id: number) {
    if (id != null && id > 0) {
      return this.http
        .get<Supplier>(`${AUTH_API}/supplier/${id}`)
        .pipe(take(1));
    } else {
      return null;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: Supplier) {
    return this.http.post<Supplier>(`${AUTH_API}/supplier`, registro).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro inserido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}/supplier/${id}`).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro removido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  private update(registro: Supplier) {
    return this.http.put(`${AUTH_API}/supplier/${registro.id}`, registro).pipe(
      take(1),
      tap()
      // (data) => this.toastr.success('Registro atualizado com sucesso'),
      // (error) => this.toastr.error(error.error.message)
    );
  }

  //Método Public para as operações de Post e PUT
  public save(registro: Supplier) {
    if (registro.id && registro.id > 0) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      id: [0, Validators.compose([])],
      cnpj: ['', Validators.compose([Validators.required])],
      razao_social: ['', Validators.compose([Validators.required])],
      nome_fantasia: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      vendedor: this.fb.group({
        nome: [0, Validators.compose([Validators.required])],
        periodo_visita: [0, Validators.compose([Validators.required])],
      }),
    });
  }

  public fillForm(Supplier: Supplier) {
    this.basicForm.patchValue({
      id: Supplier.id,
      cnpj: Supplier.cnpj,
      razao_social: Supplier.razao_social,
      nome_fantasia: Supplier.nome_fantasia,
      telefone: Supplier.telefone,
      vendedor: {
        id: Supplier.vendedor.id,
        nome: Supplier.vendedor.nome,
        periodo_visita: Supplier.vendedor.periodo_visita,
      },
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
